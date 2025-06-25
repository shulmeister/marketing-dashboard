import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Facebook access token not configured' },
        { status: 500 }
      )
    }

    // Return mock data for now to allow deployment
    const mockData = {
      overview: {
        spend: 150.25,
        impressions: 5432,
        clicks: 123,
        ctr: 2.26,
        cpm: 27.65
      },
      campaigns: [
        {
          id: '1',
          name: 'Summer Campaign',
          status: 'ACTIVE',
          spend: 75.50,
          impressions: 2500
        },
        {
          id: '2', 
          name: 'Product Launch',
          status: 'ACTIVE',
          spend: 74.75,
          impressions: 2932
        }
      ],
      dateRange: 'yesterday',
      lastUpdated: new Date().toISOString(),
      permissions: { ads_read: true },
      dataSource: 'mock_data'
    }

    return NextResponse.json(mockData)

  } catch (error) {
    console.error('Facebook API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
