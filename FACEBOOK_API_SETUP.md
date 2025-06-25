# Facebook Marketing API Setup Guide

## Overview
The Facebook Marketing API allows you to programmatically access your Facebook Ads data including campaigns, ad sets, ads, and performance metrics.

## Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" as the app type
4. Fill in your app details:
   - **App Name**: "Marketing Dashboard" (or your preferred name)
   - **App Contact Email**: Your email address
   - **Business Account**: Select your business account

## Step 2: Add Marketing API Product

1. In your app dashboard, click "Add Product"
2. Find "Marketing API" and click "Set Up"
3. This will add the Marketing API to your app

## Step 3: Get Your App Credentials

1. Go to "App Settings" → "Basic"
2. Copy these values:
   - **App ID** (this is your FACEBOOK_APP_ID)
   - **App Secret** (this is your FACEBOOK_APP_SECRET)

## Step 4: Get Your Ad Account ID

1. Go to [Facebook Ads Manager](https://business.facebook.com/adsmanager/)
2. In the top left, you'll see your account name
3. Click on it to see a dropdown with your Ad Account ID
4. It will look like: "Ad Account (123456789)"
5. Your Ad Account ID is: `act_123456789`

## Step 5: Add Marketing API Use Case (CRITICAL STEP)

**This is the missing step that causes the "No permissions available" error!**

1. Go to your Facebook App Dashboard
2. **Click the green "Add use cases" button** in the main dashboard area
3. **Look for "Marketing API"** or **"Ads Management"** in the available use cases
4. **Select it and follow the setup process**
5. If you don't see "Add use cases", click on **"Use cases"** in the left sidebar

### Alternative Method:
1. Look for **"Products"** in the left sidebar (may be under different sections)
2. Click **"Add Product"** if available
3. Find **"Marketing API"** and click **"Set Up"**

## Step 6: Generate Access Token

### Option A: Using Graph API Explorer (Recommended for testing)
1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from the dropdown
3. Click "Generate Access Token"
4. Grant permissions for:
   - `ads_read`
   - `ads_management` 
   - `business_management`
5. Copy the generated token

### Option B: Long-lived Token (For production)
1. Use the short-lived token from Option A
2. Exchange it for a long-lived token using this API call:
```
GET https://graph.facebook.com/oauth/access_token?
    grant_type=fb_exchange_token&
    client_id={your_app_id}&
    client_secret={your_app_secret}&
    fb_exchange_token={short_lived_token}
```

## Step 7: Required Permissions

Your app needs these permissions:
- **ads_read**: Read ads data
- **ads_management**: Manage ads (if you want to create/edit)
- **business_management**: Access business data

## Step 8: Test Your Setup

1. Once you have all credentials, test with this URL in your browser:
```
https://graph.facebook.com/v19.0/act_YOUR_AD_ACCOUNT_ID/insights?access_token=YOUR_ACCESS_TOKEN&fields=spend,impressions,clicks
```

Replace `YOUR_AD_ACCOUNT_ID` and `YOUR_ACCESS_TOKEN` with your actual values.

## Step 9: Update Your .env.local File

```env
FACEBOOK_ACCESS_TOKEN=your_long_lived_access_token_here
FACEBOOK_AD_ACCOUNT_ID=act_your_ad_account_id_here
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
```

## Important Notes

- **Rate Limits**: Facebook has rate limits on API calls
- **Token Expiry**: Long-lived tokens last ~60 days, you'll need to refresh them
- **Permissions**: Make sure your app is approved for the permissions you need
- **Business Verification**: For production use, you may need business verification

## Troubleshooting

### Common Issues:
1. **"Unsupported get request"**: Check your Ad Account ID format (should start with `act_`)
2. **"Invalid access token"**: Token may be expired or invalid
3. **"Permissions error"**: Make sure you've granted the required permissions
4. **"Ad account not found"**: Verify your Ad Account ID is correct

### Quick Test Commands:
```bash
# Test basic account access
curl "https://graph.facebook.com/v19.0/me/adaccounts?access_token=YOUR_TOKEN"

# Test insights access
curl "https://graph.facebook.com/v19.0/act_YOUR_ACCOUNT_ID/insights?access_token=YOUR_TOKEN&fields=spend,impressions"
```

## Security Best Practices

1. **Never commit access tokens** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate tokens regularly**
4. **Monitor API usage** in Facebook's developer dashboard
5. **Use HTTPS only** for all API calls

## Need Help?

- [Facebook Marketing API Documentation](https://developers.facebook.com/docs/marketing-api/)
- [Facebook Business Help Center](https://www.facebook.com/business/help/)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/) for testing
