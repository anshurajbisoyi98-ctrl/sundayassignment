#!/bin/bash

echo "🔨 Building frontend..."
npm run build

if [ -d "dist" ]; then
  echo "✅ Build successful! dist folder created."
  ls -la dist/
else
  echo "❌ Build failed! dist folder not found."
  exit 1
fi
