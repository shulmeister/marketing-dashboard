# Clean Repository & Vercel Deployment Guide

This guide will help you completely clean up your Git repository and redeploy to Vercel.

## Step 1: Clean Repository

Run the cleanup script:

```bash
./git-cleanup.sh
```

This script will:
1. Create a backup branch of your current state
2. Create a fresh branch without history
3. Add all files (respecting `.gitignore`)
4. Create a fresh commit
5. Force push to your remote repository

## Step 2: Verify Local Setup

After cleaning up, verify your local setup:

```bash
# Checkout the new main branch
git checkout main

# Remove any build artifacts and node_modules
rm -rf .next node_modules

# Clean install dependencies
npm clean-install

# Verify TypeScript compilation works
npx tsc --noEmit

# Verify build works
npm run build
```

## Step 3: Deploy to Vercel

After verifying locally:

1. Go to your Vercel dashboard
2. Connect to your repository
3. Configure the project:
   - Framework preset: Next.js
   - Build command: npm run build
   - Output directory: .next
   - Install command: npm clean-install
   - Environment variables: Add any required API keys

4. Click "Deploy"

## Troubleshooting

If Vercel deployment fails:

1. Check the build logs for specific errors
2. Verify all dependencies are correctly installed
3. Make sure all environment variables are set
4. Try a manual deployment using the Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from local directory
vercel
```

## Next Steps

After successful deployment:

1. Verify all API integrations work
2. Test performance and functionality
3. Set up analytics and monitoring
4. Configure custom domain if needed
