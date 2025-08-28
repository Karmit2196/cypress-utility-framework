# Build and Publish Guide

This guide provides step-by-step instructions for building, testing, and publishing the Cypress Utils Framework to npm.

**Framework Author: Karmit Lalani**

## Prerequisites

Before you can build and publish the package, ensure you have:

- Node.js 16.x or higher installed
- npm 8.x or higher installed
- Git configured with your credentials
- npm account with publish permissions
- GitHub account for repository access

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

### 2. Run Quality Checks

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run all checks
npm run prepublishOnly
```

### 3. Build the Package

```bash
# Build the package
npm run build

# Verify build output
ls -la dist/
```

## Detailed Build Process

### Step 1: Environment Setup

```bash
# Ensure you're in the project root
pwd
# Should show: /path/to/cypress-utility-framework

# Check Node.js version
node --version
# Should be 16.x or higher

# Check npm version
npm --version
# Should be 8.x or higher
```

### Step 2: Dependency Installation

```bash
# Clean install dependencies
npm ci

# Verify critical dependencies
npm list cypress
npm list typescript
npm list tsup
npm list jest
```

### Step 3: Code Quality Checks

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Run Prettier formatting
npm run format

# Run TypeScript compilation check
npm run type-check
```

### Step 4: Build Verification

```bash
# Verify build output
ls -la dist/
```

### Step 5: Building

```bash
# Clean previous builds
npm run clean

# Build the package
npm run build

# Verify build output
tree dist/
# or
find dist/ -type f
```

## Build Output Verification

After a successful build, the `dist/` directory should contain:

```
dist/
├── index.js                    # Main CommonJS bundle
├── index.d.ts                  # Main TypeScript declarations
├── index.js.map               # Main source map
├── commands/
│   ├── index.js               # Commands CommonJS bundle
│   ├── index.d.ts             # Commands TypeScript declarations
│   └── index.js.map           # Commands source map
└── utils/
    ├── index.js                # Utils CommonJS bundle
    ├── index.d.ts              # Utils TypeScript declarations
    └── index.js.map            # Utils source map
```

### Verify Bundle Contents

```bash
# Check main bundle size
wc -l dist/index.js

# Check TypeScript declarations
head -20 dist/index.d.ts

# Verify exports
node -e "console.log(Object.keys(require('./dist/index.js')))"
```

## Local Testing

### Test the Built Package Locally

```bash
# Build the package
npm run build

# Create a local npm link
npm link

# In another directory, create a test project
mkdir test-consumer
cd test-consumer
npm init -y

# Install Cypress
npm install cypress

# Link to your local package
npm link cypress-utils-framework

# Test the import
node -e "
const utils = require('cypress-utils-framework');
console.log('Utils loaded:', Object.keys(utils));
"
```

### Test with Example Project

```bash
# Navigate to example project
cd example-usage

# Install dependencies
npm install

# Run Cypress tests
npm run cypress:run
```

## Publishing to npm

### Prerequisites for Publishing

1. **npm Account**: Create an account at [npmjs.com](https://npmjs.com)
2. **Login**: Run `npm login` in your terminal
3. **Package Name**: Ensure the package name is available
4. **Repository**: Ensure GitHub repository is properly linked

### Publishing Process

#### Method 1: Manual Publishing

```bash
# Ensure you're logged in
npm whoami

# Build and verify
npm run build
npm run lint

# Publish to npm
npm publish --access public

# Verify publication
npm view cypress-utils-framework
```

#### Method 2: Automated Publishing

```bash
# Create a new version
npm version patch  # or minor/major

# This will:
# 1. Update package.json version
# 2. Create git tag
# 3. Run prepublishOnly script
# 4. Build the package

# Push changes and tags
git push
git push --tags

# Publish (if not using CI/CD)
npm publish --access public
```

#### Method 3: CI/CD Publishing (Recommended)

1. **Create a Release**:
   - Go to GitHub repository
   - Click "Releases" → "Create a new release"
   - Choose a tag (e.g., v1.0.0)
   - Add release notes
   - Publish release

2. **CI/CD Pipeline**:
   - GitHub Actions will automatically:
     - Run tests
     - Build package
     - Publish to npm

### Version Management

```bash
# Patch version (bug fixes)
npm version patch

# Minor version (new features)
npm version minor

# Major version (breaking changes)
npm version major

# Custom version
npm version 2.0.0-beta.1
```

## Post-Publication Verification

### 1. Verify npm Publication

```bash
# Check package on npm
npm view cypress-utils-framework

# Check package contents
npm pack cypress-utils-framework
tar -tzf cypress-utils-framework-*.tgz

# Install in a clean environment
mkdir test-install
cd test-install
npm init -y
npm install cypress-utils-framework
```

### 2. Test Package Installation

```bash
# Test different import methods
node -e "
// Test main import
const utils = require('cypress-utils-framework');
console.log('Main import:', Object.keys(utils));

// Test subpath imports
const commands = require('cypress-utils-framework/commands');
console.log('Commands import:', Object.keys(commands));

const utilsOnly = require('cypress-utils-framework/utils');
console.log('Utils import:', Object.keys(utilsOnly));
"
```

### 3. Verify TypeScript Support

```typescript
// Create test.ts file
import { visit, getRequest, waitForElement } from 'cypress-utils-framework';

// This should compile without errors
const testFunction = () => {
  visit('/test');
  getRequest('/api/test');
  waitForElement('.test');
};
```

## Troubleshooting

### Common Build Issues

#### TypeScript Compilation Errors

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Verify types installation
npm list @types/cypress
npm list @types/node
```

#### Dependency Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Failures

```bash
# Check tsup configuration
npx tsup --help

# Verify source files
ls -la src/

# Check for syntax errors
npx eslint src/ --ext .ts
```

### Common Publishing Issues

#### Authentication Errors

```bash
# Re-login to npm
npm logout
npm login

# Check npm configuration
npm config list
```

#### Package Name Conflicts

```bash
# Check if package name is available
npm search cypress-utils-framework

# Consider alternative names
npm search cypress-utils
npm search cypress-framework
```

#### Version Conflicts

```bash
# Check current version
npm version

# Check published versions
npm view cypress-utils-framework versions

# Force version update
npm version patch --force
```

## Maintenance and Updates

### Regular Maintenance Tasks

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix security issues
npm audit fix

# Update to latest versions (careful with breaking changes)
npx npm-check-updates -u
npm install
```

### Updating the Package

```bash
# Make your changes
# Update tests
# Update documentation

# Run quality checks
npm run prepublishOnly

# Create new version
npm version patch

# Build and publish
npm run build
npm publish --access public

# Push changes
git push && git push --tags
```

## Best Practices

### 1. Pre-Publishing Checklist

- [ ] All tests pass
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] Version number updated
- [ ] Changelog updated

### 2. Version Management

- Use semantic versioning (semver)
- Document breaking changes
- Update changelog for each release
- Tag releases in Git

### 3. Quality Assurance

- Test locally before publishing
- Verify package contents
- Test in different environments
- Monitor for issues after publication

### 4. Documentation

- Keep README.md updated
- Document breaking changes
- Provide migration guides
- Include usage examples

## Support and Resources

### Useful Commands

```bash
# Check package status
npm outdated
npm list --depth=0

# Debug npm issues
npm config list
npm cache verify

# Check package size
npm pack
du -sh *.tgz
```

### Additional Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [TypeScript Configuration](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring)

### Getting Help

- Check the [README.md](README.md) for basic information
- Review [USAGE.md](USAGE.md) for examples
- Check [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for project overview
- Open an issue on GitHub for bugs or questions

This comprehensive guide should help you successfully build, test, and publish the Cypress Utils Framework to npm. Remember to always test thoroughly before publishing and maintain high code quality standards. 