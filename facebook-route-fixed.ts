import { NextRequest, NextResponse } from 'next/server'

interface FacebookInsightsData {
  data?: any[];
  [key: string]: any;
}

interface FacebookCampaignsData {
  data?: any[];
  [key: string]: any;
}

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Facebook access token not configured' },
        { status: 500 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const dateRange = searchParams.get('date_range') || 'yesterday'

    // First, check what permissions we have
    const tokenInfoUrl = `https://graph.facebook.com/v19.0/me/permissions?access_token=${accessToken}`
    const permissionsResponse = await fetch(tokenInfoUrl)
    
    if (!permissionsResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to verify Facebook token permissions' },
        { status: 401 }
      )
    }

    const permissionsData = await permissionsResponse.json()
    const permissions = permissionsData.data?.reduce((acc: any, perm: any) => {
      if (perm.status === 'granted') {
        acc[perm.permission] = true
      }
      return acc
    }, {}) || {}

    // Check specific permissions
    const hasAdsRead = permissions['ads_read'] || false
    const hasReadInsights = permissions['read_insights'] || false
    const hasBusinessManagement = permissions['business_management'] || false

    // Check if we have ad accounts
    let adAccountId = null
    if (hasAdsRead || hasBusinessManagement) {
      try {
        const adAccountsResponse = await fetch(`https://graph.facebook.com/v19.0/me/adaccounts?access_token=${accessToken}`)
        if (adAccountsResponse.ok) {
          const adAccountsData = await adAccountsResponse.json()
          if (adAccountsData.data && adAccountsData.data.length > 0) {
            adAccountId = adAccountsData.data[0].id
          }
        }
      } catch (err) {
        console.log('Error fetching ad accounts:', err)
      }
    }

    // Define valid date presets for Facebook API
    const validDatePresets: { [key: string]: string } = {
      'today': 'today',
      'yesterday': 'yesterday',
      // Note: many common presets like 'last_7_days', 'last_30_days' don't work with this API version
      // You may need to use specific date ranges instead
    }
    
    // Use the mapped preset or default to 'yesterday' for more data
    const facebookDatePreset = validDatePresets[dateRange] || 'yesterday'
    
    // Try different approaches based on available permissions
    let insightsData: FacebookInsightsData | null = null;
    let campaignsData: FacebookCampaignsData | null = null;
    let errorDetails: string[] = [];

    // Approach 1: Try direct ad account insights (requires ads_read)
    if (hasAdsRead && adAccountId) {
      try {
        const insightsUrl = `https://graph.facebook.com/v19.0/${adAccountId}/insights`
        const params = new URLSearchParams({
          access_token: accessToken,
          fields: 'date_start,date_stop,account_id,spend,impressions,clicks,cpm,ctr,actions',
          date_preset: facebookDatePreset,
          level: 'account'
        })

        const insightsResponse = await fetch(`${insightsUrl}?${params}`)
        if (insightsResponse.ok) {
          const data = await insightsResponse.json()
          insightsData = data;
        } else {
          const error = await insightsResponse.json()
          errorDetails.push(`Direct insights failed: ${error.error?.message || 'Unknown error'}`)
        }
      } catch (err) {
        errorDetails.push(`Direct insights error: ${err instanceof Error ? err.message : 'Unknown'}`)
      }

      // Also try to get campaigns data
      try {
        const campaignsUrl = `https://graph.facebook.com/v19.0/${adAccountId}/campaigns`
        const campaignsParams = new URLSearchParams({
          access_token: accessToken,
          fields: 'name,status,objective,created_time,updated_time',
          limit: '25'
        })

        const campaignsResponse = await fetch(`${campaignsUrl}?${campaignsParams}`)
        if (campaignsResponse.ok) {
          const data = await campaignsResponse.json()
          campaignsData = data;
        } else {
          const error = await campaignsResponse.json()
          errorDetails.push(`Campaigns fetch failed: ${error.error?.message || 'Unknown error'}`)
        }
      } catch (err) {
        errorDetails.push(`Campaigns fetch error: ${err instanceof Error ? err.message : 'Unknown'}`)
      }
    }

    // Approach 2: Try page insights (if we have page access)
    if (!insightsData && hasReadInsights) {
      try {
        // Try to get pages first
        const pagesResponse = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`)
        if (pagesResponse.ok) {
          const pagesData = await pagesResponse.json()
          if (pagesData.data && pagesData.data.length > 0) {
            // Try to get insights from the first page
            const pageId = pagesData.data[0].id
            const pageInsightsResponse = await fetch(
              `https://graph.facebook.com/v19.0/${pageId}/insights?access_token=${accessToken}&metric=page_impressions,page_reach&period=day&since=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}`
            )
            if (pageInsightsResponse.ok) {
              const pageInsights = await pageInsightsResponse.json()
              insightsData = { pageInsights: pageInsights }
            }
          }
        }
      } catch (err) {
        errorDetails.push(`Page insights error: ${err instanceof Error ? err.message : 'Unknown'}`)
      }
    }

    // If we still don't have data, return helpful information
    if (!insightsData) {
      return NextResponse.json({
        error: 'Unable to fetch insights data',
        message: 'Your token has permissions but cannot access ad insights data',
        permissions: permissions,
        attempts: errorDetails,
        instructions: 'This usually means your Facebook app needs Marketing API product added, or your Business Manager needs to grant ad account access to the app.',
        status: 'partial_access',
        debugInfo: {
          hasReadInsights,
          hasAdsRead,
          hasBusinessManagement,
          adAccountId
        }
      }, { status: 403 });
    }

    // Process and return the data we got
    const processedData = {
      overview: insightsData?.data?.[0] || insightsData || {},
      campaigns: campaignsData?.data || [],
      dateRange,
      lastUpdated: new Date().toISOString(),
      permissions,
      dataSource: hasAdsRead ? 'ad_account' : 'page_insights'
    }

    return NextResponse.json(processedData)

  } catch (error) {
    console.error('Facebook API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
