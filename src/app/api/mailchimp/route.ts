import { NextRequest, NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.MAILCHIMP_API_KEY
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX

    if (!apiKey || !serverPrefix) {
      return NextResponse.json(
        { error: 'Mailchimp API credentials not configured' },
        { status: 500 }
      )
    }

    // Configure Mailchimp
    mailchimp.setConfig({
      apiKey: apiKey,
      server: serverPrefix,
    })

    const searchParams = request.nextUrl.searchParams
    const dataType = searchParams.get('type') || 'overview'

    switch (dataType) {
      case 'campaigns':
        // Fetch recent campaigns
        const campaigns = await mailchimp.campaigns.list({
          count: 10,
          sort_field: 'send_time',
          sort_dir: 'DESC',
          status: 'sent'
        })

        // Get detailed reports for each campaign
        const campaignsWithReports = await Promise.all(
          campaigns.campaigns.map(async (campaign) => {
            try {
              const report = await mailchimp.reports.getSummary(campaign.id)
              return {
                ...campaign,
                report_summary: report
              }
            } catch (error) {
              console.error(`Error fetching report for campaign ${campaign.id}:`, error)
              return campaign
            }
          })
        )

        return NextResponse.json({
          campaigns: campaignsWithReports,
          total_items: campaigns.total_items,
          lastUpdated: new Date().toISOString()
        })

      case 'lists':
        // Fetch all lists
        const lists = await mailchimp.lists.getAllLists({
          count: 10
        })

        return NextResponse.json({
          lists: lists.lists,
          total_items: lists.total_items,
          lastUpdated: new Date().toISOString()
        })

      case 'overview':
      default:
        // Fetch account overview data
        const [listsResponse, campaignsResponse] = await Promise.all([
          mailchimp.lists.getAllLists({ count: 1000 }),
          mailchimp.campaigns.list({ count: 100, status: 'sent' })
        ])

        // Calculate overview metrics
        const totalSubscribers = listsResponse.lists.reduce(
          (total: number, list) => total + list.stats.member_count, 
          0
        )

        const totalCampaigns = campaignsResponse.campaigns.length

        const avgOpenRate = campaignsResponse.campaigns.length > 0 
          ? campaignsResponse.campaigns.reduce(
              (total: number, campaign) => {
                const report = (campaign as any).report_summary;
                return total + (report?.opens?.open_rate || 0);
              }, 
              0
            ) / campaignsResponse.campaigns.length
          : 0

        const avgClickRate = campaignsResponse.campaigns.length > 0
          ? campaignsResponse.campaigns.reduce(
              (total: number, campaign) => {
                const report = (campaign as any).report_summary;
                return total + (report?.clicks?.click_rate || 0);
              }, 
              0
            ) / campaignsResponse.campaigns.length
          : 0

        return NextResponse.json({
          overview: {
            totalSubscribers,
            totalCampaigns,
            avgOpenRate: Math.round(avgOpenRate * 10000) / 100, // Convert to percentage
            avgClickRate: Math.round(avgClickRate * 10000) / 100,
            totalLists: listsResponse.lists.length
          },
          recentCampaigns: campaignsResponse.campaigns.slice(0, 5),
          lists: listsResponse.lists.slice(0, 5),
          lastUpdated: new Date().toISOString()
        })
    }

  } catch (error) {
    console.error('Mailchimp API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch Mailchimp data', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
