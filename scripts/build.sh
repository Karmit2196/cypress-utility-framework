#!/bin/bash

# Build and Publish Script for Cypress Utils Framework
# This script automates the build, test, and publish process
# Author: Karmit Lalani

set -e

echo "🚀 Starting build process for Cypress Utils Framework..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
print_status "Using Node.js version: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm --version)
print_status "Using npm version: $NPM_VERSION"

# Clean previous builds
print_status "Cleaning previous builds..."
npm run clean

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Run linting
print_status "Running linting..."
npm run lint

# Run type checking
print_status "Running type checking..."
npm run type-check

# Verify build preparation
print_status "Verifying build preparation..."

# Build the package
print_status "Building package..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not found"
    exit 1
fi

print_success "Build completed successfully!"

# Check package size
PACKAGE_SIZE=$(du -sh dist | cut -f1)
print_status "Package size: $PACKAGE_SIZE"

# Show what will be published
print_status "Files to be published:"
ls -la dist/

# Ask for confirmation before publishing (if not in CI)
if [ -z "$CI" ]; then
    echo
    read -p "Do you want to publish this package to npm? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Publishing to npm..."
        npm publish --access public
        print_success "Package published successfully!"
    else
        print_warning "Publishing skipped."
    fi
else
    print_status "Running in CI environment - skipping publish prompt"
fi

# Show next steps
echo
print_status "Next steps:"
echo "1. Review the built package in the dist/ directory"
echo "2. Test the package locally: npm pack"
echo "3. Publish to npm: npm publish --access public"
echo "4. Create a new version: npm version patch|minor|major"
echo "5. Push changes and tags: git push && git push --tags"

print_success "Build process completed! 🎉" 