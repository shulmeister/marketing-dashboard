#!/bin/bash

# Google Analytics API Enablement Script
# Run this if you're having permission issues in the web console

echo "🔧 Google Analytics API Setup Script"
echo "This script will enable the required APIs for your Google Analytics integration"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed."
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    echo ""
    echo "Alternative: Use the web console method below"
    exit 1
fi

# Get current project
PROJECT_ID=$(gcloud config get-value project)
echo "📋 Current project: $PROJECT_ID"
echo ""

if [ -z "$PROJECT_ID" ]; then
    echo "❌ No project set. Please run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

# Enable the APIs
echo "🚀 Enabling Google Analytics APIs..."
echo ""

echo "Enabling Analytics Reporting API..."
gcloud services enable analyticsreporting.googleapis.com

echo "Enabling Analytics Data API..."
gcloud services enable analyticsdata.googleapis.com

echo ""
echo "✅ APIs enabled successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://console.cloud.google.com/apis/credentials"
echo "2. Create OAuth 2.0 Client ID"
echo "3. Add redirect URI: http://localhost:3000/api/auth/google/callback"
echo "4. Download the credentials and add them to your .env.local file"
echo ""
echo "🔗 Direct links:"
echo "   - Credentials: https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"
echo "   - Analytics Reporting API: https://console.cloud.google.com/apis/library/analyticsreporting.googleapis.com?project=$PROJECT_ID"
echo "   - Analytics Data API: https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com?project=$PROJECT_ID"
