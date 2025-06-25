import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const clientId = process.env.QUICKBOOKS_CLIENT_ID
  // Use production URL for real QuickBooks data
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://marketing-dashboard-shulmeister.vercel.app'
    : 'http://localhost:3000'
  const redirectUri = `${baseUrl}/api/auth/quickbooks/callback`
  
  if (!clientId) {
    return NextResponse.json({ error: 'QuickBooks Client ID not configured' }, { status: 500 })
  }

  // Generate a random state parameter for security
  const state = Math.random().toString(36).substring(7)
  
  // QuickBooks OAuth 2.0 authorization URL
  const authUrl = new URL('https://appcenter.intuit.com/connect/oauth2')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('scope', 'com.intuit.quickbooks.accounting')
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('access_type', 'offline')
  authUrl.searchParams.set('state', state)

  // Store state in session/cookie if needed for validation
  const response = NextResponse.redirect(authUrl.toString())
  response.cookies.set('qb_oauth_state', state, { httpOnly: true, maxAge: 600 }) // 10 minutes
  
  return response
}
