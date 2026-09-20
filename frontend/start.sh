#!/bin/bash

echo "🚀 Starting frontend server..."

# Check if dist folder exists
if [ ! -d "dist" ]; then
  echo "⚠️  dist folder not found. Running build..."
  npm run build
  
  if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist folder still not found."
    exit 1
  fi
  echo "✅ Build completed successfully!"
fi

echo "✅ dist folder exists. Starting server..."
node server.js
