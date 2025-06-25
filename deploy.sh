#!/bin/bash

echo "📦 Building and pushing to GitHub for Vercel deployment..."

# Make sure npm dependencies are installed
echo "🔍 Making sure all dependencies are installed..."
npm install

# Run a clean build to test locally
echo "🔨 Running a clean build locally to verify..."
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
  echo "✅ Build successful! Pushing to GitHub..."
  
  # Add all changes to git
  git add .
  
  # Commit changes
  git commit -m "Fixed Material UI imports and build configuration"
  
  # Push to GitHub
  git push origin main
  
  echo "🚀 Changes pushed to GitHub! Vercel should start a new deployment."
  echo "🔗 Check your Vercel dashboard for deployment status."
else
  echo "❌ Build failed. Please fix the errors before pushing to GitHub."
fi
