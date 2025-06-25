# Google Analytics OAuth Setup - Final Steps

## What You Need to Do in OAuth Playground

1. **Go to**: https://developers.google.com/oauthplayground/

2. **Step 1 - Select & authorize APIs**:
   - Find the "Input your own scopes" field at the bottom
   - Enter this exact scope: `https://www.googleapis.com/auth/analytics.readonly`
   - Click "Authorize APIs"

3. **Step 2 - Sign in and grant permissions**:
   - Sign in with your Google account
   - Grant Analytics permissions when prompted
   - You'll be redirected back to OAuth Playground

4. **Step 3 - Exchange authorization code for tokens**:
   - Click "Exchange authorization code for tokens"
   - You'll see both an access token and refresh token

5. **Step 4 - Update your .env.local file**:
   ```bash
   GOOGLE_ANALYTICS_ACCESS_TOKEN=your_access_token_here
   GOOGLE_ANALYTICS_REFRESH_TOKEN=your_refresh_token_here
   ```

6. **Step 5 - Restart your development server**:
   ```bash
   npm run dev
   ```

## Your Current Credentials
- **Client ID**: Already set in .env.local
- **Client Secret**: Already set in .env.local  
- **Property ID**: 317522534 (already set)

## Testing
Once you've added the tokens and restarted the server, visit:
- http://localhost:3000 (main dashboard - should show GA data)
- http://localhost:3000/api/google-analytics (test API endpoint directly)

## Troubleshooting
If you get permission errors:
1. Make sure you're signed in to the Google account that owns the Analytics property
2. Verify the Property ID (317522534) is correct in Google Analytics
3. Check that the Analytics account has data for the date range being requested
