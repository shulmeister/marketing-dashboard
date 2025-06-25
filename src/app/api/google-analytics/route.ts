import { NextRequest, NextResponse } from 'next/server'

interface GoogleAnalyticsMetric {
  metricName: string
  value: string
}

interface GoogleAnalyticsRow {
  dimensionValues: Array<{ value: string }>
  metricValues: Array<{ value: string }>
}

interface GoogleAnalyticsResponse {
  rows?: GoogleAnalyticsRow[]
  totals?: Array<{ metricValues: GoogleAnalyticsMetric[] }>
  rowCount?: number
}

export async function GET(request: NextRequest) {
  try {
    let accessToken = process.env.GOOGLE_ANALYTICS_ACCESS_TOKEN
    const refreshToken = process.env.GOOGLE_ANALYTICS_REFRESH_TOKEN
    const clientId = process.env.GOOGLE_ANALYTICS_CLIENT_ID
    const clientSecret = process.env.GOOGLE_ANALYTICS_CLIENT_SECRET
    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID

    if (!propertyId) {
      return NextResponse.json({
        error: 'Google Analytics property ID not configured',
        message: 'Please set GOOGLE_ANALYTICS_PROPERTY_ID in your environment variables',
        status: 'missing_property_id'
      }, { status: 401 })
    }

    // If no access token, try to refresh
    if (!accessToken && refreshToken && clientId && clientSecret) {
      console.log('Attempting to refresh Google Analytics access token...')
      
      const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      })

      if (refreshResponse.ok) {
        const tokenData = await refreshResponse.json()
        accessToken = tokenData.access_token
        console.log('Google Analytics access token refreshed successfully')
      } else {
        const errorData = await refreshResponse.json()
        console.error('Failed to refresh Google Analytics token:', errorData)
        return NextResponse.json({
          error: 'Failed to refresh Google Analytics access token',
          message: 'Please re-authenticate in the Google Analytics setup',
          status: 'token_refresh_failed'
        }, { status: 401 })
      }
    }

    if (!accessToken) {
      return NextResponse.json({
        error: 'Google Analytics credentials not configured',
        message: 'Please set GOOGLE_ANALYTICS_ACCESS_TOKEN and GOOGLE_ANALYTICS_PROPERTY_ID in your environment variables',
        setup_instructions: {
          step1: 'Go to Google Cloud Console',
          step2: 'Enable Google Analytics Reporting API',
          step3: 'Create OAuth 2.0 credentials',
          step4: 'Get your GA4 Property ID from Google Analytics'
        },
        status: 'missing_credentials'
      }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('start_date') || '30daysAgo'
    const endDate = searchParams.get('end_date') || 'today'

    // Prepare the request body for GA4 Data API
    const requestBody = {
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'conversions' },
        { name: 'totalRevenue' }
      ],
      dimensions: [
        { name: 'date' }
      ]
    }

    // Make request to Google Analytics Data API
    const gaUrl = 'https://analyticsdata.googleapis.com/v1beta/properties/' + propertyId + ':runReport'
    
    let response = await fetch(gaUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    // If token expired, try to refresh and retry once
    if (!response.ok && response.status === 401 && refreshToken && clientId && clientSecret) {
      console.log('Access token expired, attempting to refresh and retry...')
      
      const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      })

      if (refreshResponse.ok) {
        const tokenData = await refreshResponse.json()
        accessToken = tokenData.access_token
        console.log('Token refreshed, retrying Google Analytics request...')
        
        // Retry the original request with new token
        response = await fetch(gaUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
      }
    }

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Google Analytics API Error:', {
        status: response.status,
        error: errorData,
        propertyId,
        timestamp: new Date().toISOString()
      })
      
      return NextResponse.json({
        error: 'Failed to fetch Google Analytics data',
        message: errorData.error?.message || 'Google Analytics API error',
        status: 'api_error',
        troubleshooting: {
          common_issues: [
            'Access token expired - need to refresh OAuth token',
            'Property ID incorrect - check GA4 property settings',
            'API not enabled - enable Analytics Reporting API in Google Cloud Console',
            'Insufficient permissions - ensure Analytics read permissions'
          ]
        }
      }, { status: response.status })
    }

    const data: GoogleAnalyticsResponse = await response.json()

    // Process the data
    const rows = data.rows || []
    const totals = data.totals?.[0]?.metricValues || []

    // Extract totals
    const overview = {
      totalSessions: parseInt(totals[0]?.value || '0'),
      totalUsers: parseInt(totals[1]?.value || '0'),
      totalConversions: parseInt(totals[2]?.value || '0'),
      totalRevenue: parseFloat(totals[3]?.value || '0')
    }

    // Process daily data
    const dailyData: { [date: string]: any } = {}
    
    rows.forEach(row => {
      const date = row.dimensionValues[0]?.value
      
      const sessions = parseInt(row.metricValues[0]?.value || '0')
      const users = parseInt(row.metricValues[1]?.value || '0')
      const conversions = parseInt(row.metricValues[2]?.value || '0')
      const revenue = parseFloat(row.metricValues[3]?.value || '0')

      // Aggregate by date
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          sessions: 0,
          users: 0,
          conversions: 0,
          revenue: 0
        }
      }

      dailyData[date].sessions += sessions
      dailyData[date].users += users
      dailyData[date].conversions += conversions
      dailyData[date].revenue += revenue
    })

    return NextResponse.json({
      overview,
      dailyData: Object.values(dailyData).sort((a: any, b: any) => a.date.localeCompare(b.date)),
      dateRange: { startDate, endDate },
      lastUpdated: new Date().toISOString(),
      rowCount: data.rowCount || 0
    })

  } catch (error) {
    console.error('Google Analytics API error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
