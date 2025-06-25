import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.GOOGLE_ANALYTICS_CLIENT_ID
    const clientSecret = process.env.GOOGLE_ANALYTICS_CLIENT_SECRET
    const redirectUri = `${request.nextUrl.origin}/api/auth/google/callback`

    if (!clientId || !clientSecret) {
      return NextResponse.json({
        error: 'Google Analytics credentials not configured',
        message: 'Please set GOOGLE_ANALYTICS_CLIENT_ID and GOOGLE_ANALYTICS_CLIENT_SECRET in your environment variables',
        setup_url: '/google-analytics-setup'
      }, { status: 401 })
    }

    // Google OAuth 2.0 authorization URL
    const scopes = [
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/analytics.reporting'
    ].join(' ')

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', scopes)
    authUrl.searchParams.set('access_type', 'offline')
    authUrl.searchParams.set('prompt', 'consent')

    return NextResponse.redirect(authUrl.toString())

  } catch (error) {
    console.error('Google OAuth initiation error:', error)
    return NextResponse.json({
      error: 'Failed to initiate Google OAuth',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
