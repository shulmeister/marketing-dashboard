import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(`${request.nextUrl.origin}/google-analytics-setup?error=${error}`)
    }

    if (!code) {
      return NextResponse.redirect(`${request.nextUrl.origin}/google-analytics-setup?error=no_code`)
    }

    const clientId = process.env.GOOGLE_ANALYTICS_CLIENT_ID
    const clientSecret = process.env.GOOGLE_ANALYTICS_CLIENT_SECRET
    const redirectUri = `${request.nextUrl.origin}/api/auth/google/callback`

    if (!clientId || !clientSecret) {
      return NextResponse.redirect(`${request.nextUrl.origin}/google-analytics-setup?error=missing_credentials`)
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error('Token exchange failed:', errorData)
      return NextResponse.redirect(`${request.nextUrl.origin}/google-analytics-setup?error=token_exchange_failed`)
    }

    const tokenData = await tokenResponse.json()
    const { access_token, refresh_token, expires_in } = tokenData

    // Create success page with token information
    const successHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Google Analytics Connected</title>
        <style>
            body { font-family: system-ui; max-width: 800px; margin: 50px auto; padding: 20px; }
            .success { background: #10b981; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .token-box { background: #f3f4f6; border: 1px solid #d1d5db; padding: 15px; border-radius: 8px; margin: 10px 0; }
            .token { font-family: monospace; word-break: break-all; font-size: 12px; }
            button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
            button:hover { background: #2563eb; }
        </style>
    </head>
    <body>
        <div class="success">
            <h1>✅ Google Analytics Connected Successfully!</h1>
            <p>Your Google Analytics integration is now authorized and ready to use.</p>
        </div>
        
        <h2>Environment Variables to Add</h2>
        <p>Add these to your <code>.env.local</code> file:</p>
        
        <div class="token-box">
            <strong>Access Token (expires in ${expires_in} seconds):</strong>
            <div class="token">GOOGLE_ANALYTICS_ACCESS_TOKEN=${access_token}</div>
        </div>
        
        ${refresh_token ? `
        <div class="token-box">
            <strong>Refresh Token (save this for long-term access):</strong>
            <div class="token">GOOGLE_ANALYTICS_REFRESH_TOKEN=${refresh_token}</div>
        </div>
        ` : ''}
        
        <button onclick="copyTokens()">Copy All Tokens</button>
        <button onclick="window.close()">Close Window</button>
        
        <h3>Next Steps:</h3>
        <ol>
            <li>Copy the tokens above to your <code>.env.local</code> file</li>
            <li>Restart your development server</li>
            <li>Test the Google Analytics API at <code>/api/google-analytics</code></li>
            <li>View your dashboard with real Google Analytics data!</li>
        </ol>
        
        <script>
            function copyTokens() {
                const tokens = \`# Google Analytics Tokens
GOOGLE_ANALYTICS_ACCESS_TOKEN=${access_token}${refresh_token ? `
GOOGLE_ANALYTICS_REFRESH_TOKEN=${refresh_token}` : ''}\`;
                navigator.clipboard.writeText(tokens).then(() => {
                    alert('Tokens copied to clipboard!');
                });
            }
        </script>
    </body>
    </html>
    `

    return new NextResponse(successHtml, {
      headers: { 'Content-Type': 'text/html' },
    })

  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(`${request.nextUrl.origin}/google-analytics-setup?error=callback_failed`)
  }
}
