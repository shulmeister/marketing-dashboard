# QuickBooks & Google Analytics Integration Setup

This guide will help you connect your QuickBooks and Google Analytics accounts to get real revenue data and calculate accurate ROAS.

## QuickBooks Integration Setup

### Step 1: Create QuickBooks App
1. Go to [Intuit Developer](https://developer.intuit.com/)
2. Sign in with your Intuit account
3. Click "Create an App"
4. Choose "QuickBooks Online" and select "Accounting"
5. Fill in your app details:
   - App Name: "Marketing Dashboard"
   - Description: "Marketing analytics dashboard"

### Step 2: Configure OAuth 2.0
1. In your app dashboard, go to "Keys & OAuth"
2. Copy your **Client ID** and **Client Secret**
3. Add redirect URI: `http://localhost:3000/api/auth/quickbooks/callback`
4. Note down your **Sandbox Base URL** and **Production Base URL**

### Step 3: Get Access Token
You'll need to implement OAuth flow or use QuickBooks' OAuth playground:
1. Go to [OAuth 2.0 Playground](https://developer.intuit.com/app/developer/playground)
2. Authorize your app to access QuickBooks data
3. Copy the **Access Token** and **Company ID**

### Step 4: Add Environment Variables
Add these to your `.env.local` file:

```bash
# QuickBooks Configuration
QUICKBOOKS_CLIENT_ID=your_client_id_here
QUICKBOOKS_CLIENT_SECRET=your_client_secret_here
QUICKBOOKS_ACCESS_TOKEN=your_access_token_here
QUICKBOOKS_COMPANY_ID=your_company_id_here
QUICKBOOKS_BASE_URL=https://sandbox-quickbooks.api.intuit.com  # Use production URL for live data
```

## Google Analytics Integration Setup

### Step 1: Enable Google Analytics API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google Analytics Reporting API" and "Google Analytics Data API"
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/google/callback`

### Step 2: Get GA4 Property ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Go to Admin → Property Settings
4. Copy your **Property ID** (format: 123456789)

### Step 3: OAuth Setup
1. Download your OAuth client credentials JSON file
2. Use Google's OAuth 2.0 Playground or implement OAuth flow
3. Get your **Access Token** with these scopes:
   - `https://www.googleapis.com/auth/analytics.readonly`
   - `https://www.googleapis.com/auth/analytics.reporting`

### Step 4: Add Environment Variables
Add these to your `.env.local` file:

```bash
# Google Analytics Configuration
GOOGLE_ANALYTICS_CLIENT_ID=your_client_id_here
GOOGLE_ANALYTICS_CLIENT_SECRET=your_client_secret_here
GOOGLE_ANALYTICS_ACCESS_TOKEN=your_access_token_here
GOOGLE_ANALYTICS_PROPERTY_ID=your_property_id_here
```

## Enhanced .env.local Template

```bash
# Facebook Ads (already configured)
FACEBOOK_ACCESS_TOKEN=your_facebook_token
FACEBOOK_AD_ACCOUNT_ID=act_1234567890

# Mailchimp (already configured)  
MAILCHIMP_API_KEY=your_mailchimp_key
MAILCHIMP_SERVER_PREFIX=us21

# QuickBooks Integration
QUICKBOOKS_CLIENT_ID=your_quickbooks_client_id
QUICKBOOKS_CLIENT_SECRET=your_quickbooks_client_secret
QUICKBOOKS_ACCESS_TOKEN=your_quickbooks_access_token
QUICKBOOKS_COMPANY_ID=your_quickbooks_company_id
QUICKBOOKS_BASE_URL=https://sandbox-quickbooks.api.intuit.com

# Google Analytics Integration
GOOGLE_ANALYTICS_CLIENT_ID=your_ga_client_id
GOOGLE_ANALYTICS_CLIENT_SECRET=your_ga_client_secret
GOOGLE_ANALYTICS_ACCESS_TOKEN=your_ga_access_token
GOOGLE_ANALYTICS_PROPERTY_ID=your_ga_property_id
```

## Testing the Integrations

### Test QuickBooks API
```bash
curl http://localhost:3000/api/quickbooks
```

### Test Google Analytics API
```bash
curl http://localhost:3000/api/google-analytics
```

## What You'll Get

### From QuickBooks:
- **Total Revenue**: All sales receipts and invoices
- **Revenue by Date**: Daily revenue breakdown
- **Average Transaction Value**: Revenue insights
- **Real ROAS Calculation**: Revenue ÷ Ad Spend

### From Google Analytics:
- **Website Conversions**: Actual conversion tracking
- **Traffic Sources**: Which ads drive the most traffic
- **User Behavior**: Sessions, pageviews, bounce rate
- **E-commerce Revenue**: If you have enhanced e-commerce set up

## Next Steps

1. **Set up the integrations** using the steps above
2. **Test the API endpoints** to ensure they're working
3. **Update your dashboard** to use real revenue data
4. **Configure conversion tracking** in Google Analytics for better insights

## Troubleshooting

### QuickBooks Issues:
- **401 Unauthorized**: Check your access token and company ID
- **403 Forbidden**: Verify your app has the right permissions
- **Sandbox vs Production**: Make sure you're using the right base URL

### Google Analytics Issues:
- **403 Forbidden**: Check your OAuth scopes and property permissions
- **Invalid Property ID**: Verify your GA4 property ID format
- **No Data**: Ensure your GA4 property has data and tracking is set up

Need help with the setup? Let me know which integration you'd like to tackle first!
