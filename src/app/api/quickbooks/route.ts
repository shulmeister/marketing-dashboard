import { NextRequest, NextResponse } from 'next/server'

interface QuickBooksItem {
  Id: string
  Name: string
  Amount: number
  TxnDate: string
  CustomerRef?: {
    value: string
    name: string
  }
}

interface QuickBooksResponse {
  QueryResponse: {
    Item?: QuickBooksItem[]
    startPosition: number
    maxResults: number
  }
}

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.QUICKBOOKS_ACCESS_TOKEN
    const companyId = process.env.QUICKBOOKS_COMPANY_ID
    const baseUrl = process.env.QUICKBOOKS_BASE_URL || 'https://sandbox-quickbooks.api.intuit.com'

    if (!accessToken || !companyId) {
      return NextResponse.json({
        error: 'QuickBooks credentials not configured',
        message: 'Please set QUICKBOOKS_ACCESS_TOKEN and QUICKBOOKS_COMPANY_ID in your environment variables',
        status: 'missing_credentials'
      }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('start_date') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const endDate = searchParams.get('end_date') || new Date().toISOString().split('T')[0]

    // Query for sales receipts and invoices in the date range
    const salesQuery = `SELECT * FROM SalesReceipt WHERE TxnDate >= '${startDate}' AND TxnDate <= '${endDate}' ORDERBY TxnDate DESC`
    const invoicesQuery = `SELECT * FROM Invoice WHERE TxnDate >= '${startDate}' AND TxnDate <= '${endDate}' ORDERBY TxnDate DESC`

    // Fetch sales receipts
    const salesUrl = `${baseUrl}/v3/company/${companyId}/query?query=${encodeURIComponent(salesQuery)}`
    const salesResponse = await fetch(salesUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    })

    // Capture intuit_tid for troubleshooting (Intuit requirement)
    const intuitTid = salesResponse.headers.get('intuit_tid')
    console.log('QuickBooks API Request:', {
      url: salesUrl,
      intuit_tid: intuitTid,
      status: salesResponse.status,
      timestamp: new Date().toISOString()
    })

    if (!salesResponse.ok) {
      const errorData = await salesResponse.json()
      console.error('QuickBooks API Error:', {
        intuit_tid: intuitTid,
        status: salesResponse.status,
        error: errorData,
        timestamp: new Date().toISOString()
      })
      
      return NextResponse.json({
        error: 'Failed to fetch QuickBooks data',
        message: errorData.Fault?.[0]?.Detail || 'QuickBooks API error',
        intuit_tid: intuitTid,
        status: 'api_error'
      }, { status: salesResponse.status })
    }

    const salesData: QuickBooksResponse = await salesResponse.json()

    // Fetch invoices
    const invoicesUrl = `${baseUrl}/v3/company/${companyId}/query?query=${encodeURIComponent(invoicesQuery)}`
    const invoicesResponse = await fetch(invoicesUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    })

    let invoicesData: QuickBooksResponse = { QueryResponse: { startPosition: 0, maxResults: 0 } }
    if (invoicesResponse.ok) {
      invoicesData = await invoicesResponse.json()
      console.log('QuickBooks Invoices fetched successfully:', {
        intuit_tid: invoicesResponse.headers.get('intuit_tid'),
        count: invoicesData.QueryResponse.Item?.length || 0
      })
    } else {
      console.error('QuickBooks Invoices API Error:', {
        intuit_tid: invoicesResponse.headers.get('intuit_tid'),
        status: invoicesResponse.status,
        timestamp: new Date().toISOString()
      })
    }

    // Process the data
    const sales = salesData.QueryResponse.Item || []
    const invoices = invoicesData.QueryResponse.Item || []
    
    // Calculate totals
    const totalSalesRevenue = sales.reduce((sum, item) => sum + (item.Amount || 0), 0)
    const totalInvoicesRevenue = invoices.reduce((sum, item) => sum + (item.Amount || 0), 0)
    const totalRevenue = totalSalesRevenue + totalInvoicesRevenue

    // Group by date for trends
    const revenueByDate: { [date: string]: number } = {}
    
    const allTransactions = [...sales, ...invoices]
    allTransactions.forEach(item => {
      const date = item.TxnDate
      if (!revenueByDate[date]) {
        revenueByDate[date] = 0
      }
      revenueByDate[date] += item.Amount || 0
    })

    return NextResponse.json({
      overview: {
        totalRevenue,
        totalSales: totalSalesRevenue,
        totalInvoices: totalInvoicesRevenue,
        transactionCount: sales.length + invoices.length,
        averageTransactionValue: totalRevenue / (sales.length + invoices.length) || 0
      },
      revenueByDate,
      transactions: allTransactions.sort((a, b) => 
        new Date(b.TxnDate).getTime() - new Date(a.TxnDate).getTime()
      ),
      dateRange: { startDate, endDate },
      lastUpdated: new Date().toISOString(),
      intuit_tid: intuitTid // Include for troubleshooting
    })

  } catch (error) {
    console.error('QuickBooks API error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
