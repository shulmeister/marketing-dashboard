## QuickBooks Sandbox Setup (No ngrok needed!)

Since you're using sandbox credentials, you can use localhost URLs directly. Here's what you need to do:

### 1. Update Your QuickBooks App Redirect URI

Go to: https://developer.intuit.com/app/developer/mykeys

1. Click on your app (or create a new sandbox app if needed)
2. In the "Redirect URIs" section, make sure you have:
   ```
   http://localhost:3000/api/auth/quickbooks/callback
   ```

### 2. Verify Your Environment Variables

Your `.env.local` should have these sandbox credentials:
```bash
QUICKBOOKS_CLIENT_ID=AB4U10o9X8fAjQ0buAwtHJ0DgIeUX9qjHnSYlWyEllMz7RV83W
QUICKBOOKS_CLIENT_SECRET=CNgCpOFGyLWypDqw5nmj2oSfMxFrnCwnamDHyj6f
QUICKBOOKS_BASE_URL=https://sandbox-quickbooks.api.intuit.com
```

### 3. Test the Integration

1. Start your dev server: `npm run dev`
2. Go to: http://localhost:3000
3. Click "Connect QuickBooks"
4. Complete the OAuth flow
5. Copy the tokens to your `.env.local`
6. Restart the server

### 4. Expected Flow

1. Click "Connect QuickBooks" → Redirects to QuickBooks
2. Sign in with sandbox account → Redirects back to localhost
3. Success page shows your tokens → Copy to `.env.local`
4. Restart server → Dashboard shows QuickBooks data

### 5. Creating a Sandbox Company (if needed)

If you don't have a QuickBooks sandbox company:
1. Go to https://developer.intuit.com/app/developer/playground
2. Create a new sandbox company with sample data
3. Use those credentials for testing

This is much simpler than the ngrok approach and perfect for development!
