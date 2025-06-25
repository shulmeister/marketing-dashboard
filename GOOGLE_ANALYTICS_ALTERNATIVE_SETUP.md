# Alternative Google Analytics Setup (OAuth Playground Method)

If you're having issues with Google Cloud Console permissions, you can use Google's OAuth 2.0 Playground to get access tokens directly.

## Method 1: OAuth 2.0 Playground

1. **Go to OAuth Playground**: https://developers.google.com/oauthplayground/

2. **Configure Settings** (click gear icon):
   - Check "Use your own OAuth credentials"
   - Enter your OAuth Client ID and Client Secret (from Google Cloud Console)

3. **Select Scopes**:
   - Add these scopes:
     - `https://www.googleapis.com/auth/analytics.readonly`
     - `https://www.googleapis.com/auth/analytics.reporting`

4. **Authorize APIs**:
   - Click "Authorize APIs"
   - Sign in with your Google account
   - Grant permissions

5. **Exchange Code for Tokens**:
   - Click "Exchange authorization code for tokens"
   - Copy the Access Token and Refresh Token

6. **Add to .env.local**:
```bash
GOOGLE_ANALYTICS_ACCESS_TOKEN=your_access_token_here
GOOGLE_ANALYTICS_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_ANALYTICS_PROPERTY_ID=your_ga4_property_id
```

## Method 2: Direct API Key (Read-Only)

If OAuth is too complex, you can use a simple API key for read-only access:

1. **Go to Credentials**: https://console.cloud.google.com/apis/credentials
2. **Create API Key**: Click "Create Credentials" → "API Key"
3. **Restrict the Key**: Edit the key and restrict it to Analytics APIs
4. **Add to .env.local**:
```bash
GOOGLE_ANALYTICS_API_KEY=your_api_key_here
GOOGLE_ANALYTICS_PROPERTY_ID=your_ga4_property_id
```

## Testing

Once you have either tokens or API key, test the integration:

```bash
curl "http://localhost:3000/api/google-analytics"
```

## Troubleshooting

- **403 Forbidden**: Check your GA4 property permissions
- **401 Unauthorized**: Verify your tokens/API key
- **Property not found**: Double-check your GA4 Property ID format (should be numbers only)

The OAuth Playground method bypasses most Google Cloud Console permission issues!
