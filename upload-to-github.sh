#!/bin/bash

echo "🚀 Uploading Marketing Dashboard to GitHub..."

# Initialize git if needed
git init

# Add remote if not exists
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/shulmeister/marketing-dashboard.git

# Add all files
git add .

# Check if there are files to commit
if git diff --staged --quiet; then
    echo "No changes to commit"
else
    echo "Committing files..."
    git commit -m "Initial commit: Complete Marketing Dashboard with integrations"
    
    echo "Pushing to GitHub..."
    git branch -M main
    git push -u origin main --force
    
    echo "✅ Upload complete! Check: https://github.com/shulmeister/marketing-dashboard"
fi
