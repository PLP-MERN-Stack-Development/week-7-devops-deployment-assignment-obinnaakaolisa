#!/bin/bash

# Deployment script for Socket.io Chat Application
set -e

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "client" ] && [ ! -d "server" ]; then
    echo "❌ Error: This script must be run from the project root directory"
    exit 1
fi

# Function to deploy backend
deploy_backend() {
    echo "📦 Deploying backend..."
    
    cd server
    
    # Install dependencies
    echo "Installing backend dependencies..."
    npm ci --production
    
    # Run tests
    echo "Running backend tests..."
    npm test
    
    echo "✅ Backend ready for deployment"
    cd ..
}

# Function to deploy frontend
deploy_frontend() {
    echo "🎨 Deploying frontend..."
    
    cd client
    
    # Install dependencies
    echo "Installing frontend dependencies..."
    npm ci
    
    # Run tests
    echo "Running frontend tests..."
    npm run test
    
    # Build for production
    echo "Building frontend for production..."
    npm run build
    
    echo "✅ Frontend built successfully"
    cd ..
}

# Main deployment process
main() {
    echo "Starting deployment for Socket.io Chat Application"
    
    # Deploy backend
    deploy_backend
    
    # Deploy frontend
    deploy_frontend
    
    echo "🎉 Deployment process completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Deploy backend to Render, Railway, or Heroku"
    echo "2. Deploy frontend to Vercel, Netlify, or GitHub Pages"
    echo "3. Update environment variables with production URLs"
    echo "4. Test the deployed application"
}

# Run main function
main