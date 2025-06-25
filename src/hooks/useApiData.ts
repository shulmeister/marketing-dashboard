import { useState, useEffect } from 'react'

interface UseFacebookDataOptions {
  dateRange?: string
  refreshInterval?: number
}

interface FacebookData {
  overview: any
  campaigns: any[]
  dateRange: string
  lastUpdated: string
}

export function useFacebookData(options: UseFacebookDataOptions = {}) {
  const { dateRange = 'yesterday', refreshInterval = 300000 } = options // 5 minutes default, use 'yesterday' for more data
  const [data, setData] = useState<FacebookData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [permissionError, setPermissionError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      setPermissionError(null)
      
      const response = await fetch(`/api/facebook?date_range=${dateRange}`)
      const result = await response.json()
      
      console.log('Facebook API Response:', { 
        status: response.status, 
        ok: response.ok, 
        result 
      })
      
      if (!response.ok) {
        if (response.status === 403 && result.status === 'partial_access') {
          // Handle permission error specially
          console.log('Setting permission error:', result.message)
          setPermissionError(result.message || 'Missing Facebook ads permissions')
          setData(null)
        } else {
          throw new Error(result.error || 'Failed to fetch Facebook data')
        }
      } else {
        console.log('Facebook API success, clearing permission error')
        setData(result)
        setPermissionError(null) // Clear any previous permission errors
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      console.error('Facebook API fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Set up auto-refresh if interval is provided
    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [dateRange, refreshInterval])

  return { data, loading, error, permissionError, refetch: fetchData }
}

interface UseMailchimpDataOptions {
  type?: 'overview' | 'campaigns' | 'lists'
  refreshInterval?: number
}

interface MailchimpData {
  overview?: any
  campaigns?: any[]
  lists?: any[]
  total_items?: number
  lastUpdated: string
}

export function useMailchimpData(options: UseMailchimpDataOptions = {}) {
  const { type = 'overview', refreshInterval = 300000 } = options // 5 minutes default
  const [data, setData] = useState<MailchimpData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/mailchimp?type=${type}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch Mailchimp data')
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      console.error('Mailchimp API fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Set up auto-refresh if interval is provided
    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [type, refreshInterval])

  return { data, loading, error, refetch: fetchData }
}

interface UseQuickBooksDataOptions {
  startDate?: string
  endDate?: string
  refreshInterval?: number
}

interface QuickBooksData {
  overview: {
    totalRevenue: number
    totalSales: number
    totalInvoices: number
    transactionCount: number
    averageTransactionValue: number
  }
  revenueByDate: { [date: string]: number }
  transactions: any[]
  dateRange: { startDate: string; endDate: string }
  lastUpdated: string
}

export function useQuickBooksData(options: UseQuickBooksDataOptions = {}) {
  const { startDate, endDate, refreshInterval = 300000 } = options // 5 minutes default
  const [data, setData] = useState<QuickBooksData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (startDate) params.set('start_date', startDate)
      if (endDate) params.set('end_date', endDate)
      
      const response = await fetch(`/api/quickbooks?${params.toString()}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch QuickBooks data')
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      console.error('QuickBooks API fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Set up auto-refresh if interval is provided
    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [startDate, endDate, refreshInterval])

  return { data, loading, error, refetch: fetchData }
}

interface UseGoogleAnalyticsDataOptions {
  startDate?: string
  endDate?: string
  refreshInterval?: number
}

interface GoogleAnalyticsData {
  overview: {
    totalSessions: number
    totalUsers: number
    totalPageviews: number
    bounceRate: number
    avgSessionDuration: number
    totalConversions: number
    totalRevenue: number
    purchaseRevenue: number
  }
  dailyData: any[]
  sourceData: any[]
  dateRange: { startDate: string; endDate: string }
  lastUpdated: string
  rowCount: number
}

export function useGoogleAnalyticsData(options: UseGoogleAnalyticsDataOptions = {}) {
  const { startDate = '30daysAgo', endDate = 'today', refreshInterval = 300000 } = options // 5 minutes default
  const [data, setData] = useState<GoogleAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      params.set('start_date', startDate)
      params.set('end_date', endDate)
      
      const response = await fetch(`/api/google-analytics?${params.toString()}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch Google Analytics data')
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      console.error('Google Analytics API fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Set up auto-refresh if interval is provided
    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [startDate, endDate, refreshInterval])

  return { data, loading, error, refetch: fetchData }
}

// Utility hook for combining multiple data sources with revenue
export function useEnhancedDashboardData() {
  const facebook = useFacebookData()
  const mailchimp = useMailchimpData()
  const quickbooks = useQuickBooksData()
  const analytics = useGoogleAnalyticsData()

  const loading = facebook.loading || mailchimp.loading || quickbooks.loading || analytics.loading
  const error = mailchimp.error || quickbooks.error || analytics.error || 
    (facebook.error && !facebook.permissionError ? facebook.error : null)

  // Calculate real ROAS with QuickBooks revenue data
  const calculateROAS = () => {
    const spend = facebook?.data?.overview?.spend ? parseFloat(facebook.data.overview.spend) : 0
    const revenue = quickbooks?.data?.overview?.totalRevenue || analytics?.data?.overview?.totalRevenue || 0
    return spend > 0 ? revenue / spend : 0
  }

  const refetchAll = async () => {
    await Promise.all([
      facebook.refetch(), 
      mailchimp.refetch(),
      quickbooks.refetch(),
      analytics.refetch()
    ])
  }

  return {
    facebook: {
      data: facebook.data,
      error: facebook.error,
      permissionError: facebook.permissionError,
      loading: facebook.loading
    },
    mailchimp: mailchimp.data,
    quickbooks: quickbooks.data,
    analytics: analytics.data,
    realROAS: calculateROAS(),
    loading,
    error,
    refetch: refetchAll
  }
}

// Utility hook for combining multiple data sources
export function useDashboardData() {
  const facebook = useFacebookData()
  const mailchimp = useMailchimpData()

  const loading = facebook.loading || mailchimp.loading
  // Only show general errors if it's not a Facebook permission issue
  const error = mailchimp.error || (facebook.error && !facebook.permissionError ? facebook.error : null)

  const refetchAll = async () => {
    await Promise.all([facebook.refetch(), mailchimp.refetch()])
  }

  return {
    facebook: {
      data: facebook.data,
      error: facebook.error,
      permissionError: facebook.permissionError,
      loading: facebook.loading
    },
    mailchimp: mailchimp.data,
    loading,
    error,
    refetch: refetchAll
  }
}
