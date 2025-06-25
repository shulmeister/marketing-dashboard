#!/bin/bash
set -e

# Stop any ongoing git processes
pkill -f "git push" || true

# Create a backup branch of current state
echo "Creating backup branch..."
git branch -m backup-$(date +%Y%m%d-%H%M%S)

# Create a new main branch without history
echo "Creating fresh branch..."
git checkout --orphan fresh-main

# Add all source files but respect .gitignore
echo "Adding files (respecting .gitignore)..."
git add .

# Create fresh commit
echo "Creating commit..."
git commit -m "Fresh start: Clean repository with source files only"

# Force push to remote (replace 'main' with your branch name if different)
echo "Force pushing to remote..."
git push -f origin fresh-main:main

echo "Done! Repository has been cleaned."
echo "Your old files are in the backup branch locally."
echo "You may now want to: git checkout main"
