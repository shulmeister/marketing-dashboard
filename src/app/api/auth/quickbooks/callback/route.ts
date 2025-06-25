import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const realmId = searchParams.get('realmId') // This is the Company ID
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`${request.nextUrl.origin}/?error=quickbooks_auth_failed&message=${error}`)
  }

  if (!code || !realmId) {
    return NextResponse.redirect(`${request.nextUrl.origin}/?error=quickbooks_auth_failed&message=missing_code_or_realm`)
  }

  try {
    const clientId = process.env.QUICKBOOKS_CLIENT_ID
    const clientSecret = process.env.QUICKBOOKS_CLIENT_SECRET
    // Use production URL for real QuickBooks data
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://marketing-dashboard-shulmeister.vercel.app'
      : 'http://localhost:3000'
    const redirectUri = `${baseUrl}/api/auth/quickbooks/callback`

    if (!clientId || !clientSecret) {
      throw new Error('QuickBooks credentials not configured')
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      })
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      throw new Error(`Token exchange failed: ${errorData}`)
    }

    const tokenData = await tokenResponse.json()

    // Create a success page with the credentials
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>QuickBooks Integration Success</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
            .code-block { background: #f8f9fa; border: 1px solid #e9ecef; padding: 15px; border-radius: 5px; font-family: monospace; margin: 10px 0; }
            .copy-btn { background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 10px; }
        </style>
    </head>
    <body>
        <div class="success">
            <h2>✅ QuickBooks Integration Successful!</h2>
            <p>Your QuickBooks account has been successfully connected to your Marketing Dashboard.</p>
        </div>

        <h3>📋 Add these to your .env.local file:</h3>
        
        <div class="code-block">
QUICKBOOKS_ACCESS_TOKEN=${tokenData.access_token}
QUICKBOOKS_COMPANY_ID=${realmId}
        </div>

        <h3>🔄 Complete Setup:</h3>
        <ol>
            <li>Copy the credentials above to your <code>.env.local</code> file</li>
            <li>Restart your development server: <code>npm run dev</code></li>
            <li>Test the integration: <code>curl http://localhost:3000/api/quickbooks</code></li>
            <li>Return to your <a href="/">Marketing Dashboard</a></li>
        </ol>

        <h3>📝 Token Information:</h3>
        <ul>
            <li><strong>Access Token:</strong> Valid for ${tokenData.expires_in} seconds</li>
            <li><strong>Refresh Token:</strong> ${tokenData.refresh_token ? 'Available for renewal' : 'Not provided'}</li>
            <li><strong>Company ID:</strong> ${realmId}</li>
            <li><strong>Token Type:</strong> ${tokenData.token_type}</li>
        </ul>

        <script>
            function copyToClipboard(text) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Copied to clipboard!');
                });
            }
        </script>
    </body>
    </html>
    `

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    })

  } catch (error) {
    console.error('QuickBooks OAuth error:', error)
    return NextResponse.redirect(`${request.nextUrl.origin}/?error=quickbooks_auth_failed&message=${encodeURIComponent(error instanceof Error ? error.message : 'Unknown error')}`)
  }
}
