# Cypress Utils Framework - Project Structure

This document provides a comprehensive overview of the project structure, setup instructions, and development workflow.

**Framework Author: Karmit Lalani**

## Project Overview

The Cypress Utils Framework is a comprehensive utility library that extends Cypress with enhanced commands and utility functions for test automation. It's built with TypeScript and designed to be published as an npm package.

## Directory Structure

```
cypress-utility-framework/
├── .github/                          # GitHub Actions workflows
│   └── workflows/
│       └── ci-cd.yml                # CI/CD pipeline
├── example-usage/                    # Example consumer project
│   ├── cypress/
│   │   ├── e2e/
│   │   │   ├── login.cy.ts         # Example login tests
│   │   │   └── api.cy.ts           # Example API tests
│   │   └── support/
│   │       └── e2e.ts              # Cypress support file
│   ├── cypress.config.ts            # Cypress configuration
│   └── package.json                 # Example project dependencies
├── scripts/                          # Build and utility scripts
│   └── build.sh                     # Automated build script
├── src/                             # Source code
│   ├── __tests__/                   # Unit tests
│   │   ├── setup.ts                 # Jest test setup
│   │   └── utils.test.ts            # Utility function tests
│   ├── commands/                     # Cypress command extensions
│   │   └── index.ts                 # Command extension logic
│   ├── types/                        # TypeScript type definitions
│   │   └── index.ts                 # Main type definitions
│   ├── utils/                        # Utility functions
│   │   ├── elements.ts              # Element interaction utilities
│   │   ├── navigation.ts            # Navigation utilities
│   │   ├── network.ts               # Network utilities
│   │   ├── requests.ts              # HTTP request utilities
│   │   ├── testData.ts              # Test data generation
│   │   └── index.ts                 # Utils export file
│   └── index.ts                     # Main package entry point
├── .eslintrc.js                     # ESLint configuration
├── .gitignore                       # Git ignore rules
├── .npmignore                       # NPM ignore rules
├── .prettierrc                      # Prettier configuration
├── jest.config.js                   # Jest test configuration
├── LICENSE                          # MIT license
├── package.json                     # Package configuration
├── PROJECT_STRUCTURE.md             # This file
├── README.md                        # Main documentation
├── tsup.config.ts                   # Build configuration
├── tsconfig.json                    # TypeScript configuration
└── USAGE.md                         # Comprehensive usage guide
```

## Key Components

### 1. Source Code (`src/`)

#### Utils (`src/utils/`)
- **`navigation.ts`**: Enhanced navigation commands (visit, reload, goBack, etc.)
- **`requests.ts`**: HTTP request utilities (GET, POST, PUT, DELETE, PATCH)
- **`elements.ts`**: Element interaction utilities (waitForElement, assertText, etc.)
- **`testData.ts`**: Test data generation utilities
- **`network.ts`**: Network management utilities

#### Commands (`src/commands/`)
- **`index.ts`**: Extends Cypress with custom commands using utility functions

#### Types (`src/types/`)
- **`index.ts`**: TypeScript type definitions for all utilities and commands

### 2. Configuration Files

#### Build Configuration
- **`tsup.config.ts`**: Configures the build process using tsup
- **`tsconfig.json`**: TypeScript compiler options
- **`jest.config.js`**: Jest testing framework configuration

#### Code Quality
- **`.eslintrc.js`**: ESLint rules for code quality
- **`.prettierrc`**: Prettier formatting rules
- **`.gitignore`**: Git ignore patterns
- **`.npmignore`**: NPM package ignore patterns

### 3. Example Usage (`example-usage/`)

A complete example project demonstrating how to consume the framework:
- Cypress configuration
- Support file with command extensions
- Example test files
- Package.json with local dependency

### 4. CI/CD Pipeline (`.github/workflows/`)

Automated workflow for:
- Testing across multiple Node.js versions
- Building the package
- Publishing to npm on releases

## Setup Instructions

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Git

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/cypress-utils-framework.git
cd cypress-utils-framework

# Install dependencies
npm install
```

### 2. Development Setup

```bash
# Install development dependencies
npm install

# Run linting
npm run lint

# Run type checking
npm run type-check

# Verify build preparation
npm run type-check
```

### 3. Building the Package

```bash
# Build the package
npm run build

# Build in watch mode (development)
npm run dev

# Clean build artifacts
npm run clean
```

### 4. Testing the Example Project

```bash
# Navigate to example project
cd example-usage

# Install dependencies
npm install

# Run Cypress tests
npm run cypress:open
# or
npm run cypress:run
```

## Development Workflow

### 1. Making Changes

1. Create a feature branch: `git checkout -b feature/new-utility`
2. Make your changes in the `src/` directory
3. Add tests in `src/__tests__/`
4. Update documentation if needed
5. Build package: `npm run build`
6. Run linting: `npm run lint`

### 2. Testing Changes

```bash
# Verify build preparation
npm run type-check

# Check code quality
npm run lint
npm run type-check

# Build to verify no build errors
npm run build
```

### 3. Local Testing

```bash
# Build the package
npm run build

# Link locally for testing
npm link

# In another project, link to this package
npm link cypress-utils-framework
```

### 4. Publishing

```bash
# Build the package
npm run build

# Run tests and linting
npm run prepublishOnly

# Create a new version
npm version patch  # or minor/major

# Publish to npm
npm publish --access public

# Push changes and tags
git push && git push --tags
```

## Package Structure

### Entry Points

The package exports multiple entry points:

```typescript
// Main utilities
import { visit, getRequest, waitForElement } from 'cypress-utils-framework';

// Command extensions only
import { extendCypressCommands } from 'cypress-utils-framework/commands';

// Utilities only
import * as utils from 'cypress-utils-framework/utils';

// Types
import { CypressUtils, RequestOptions } from 'cypress-utils-framework';
```

### Built Output

After building, the `dist/` directory contains:

```
dist/
├── index.js                    # CommonJS bundle
├── index.d.ts                  # TypeScript declarations
├── index.js.map               # Source maps
├── commands/
│   ├── index.js
│   ├── index.d.ts
│   └── index.js.map
└── utils/
    ├── index.js
    ├── index.d.ts
    └── index.js.map
```

## Quality Strategy

### Code Quality Assurance

- **Linting**: ESLint ensures code quality and consistency
- **Type Checking**: TypeScript compilation verifies type safety
- **Formatting**: Prettier maintains consistent code style
- **Build Verification**: Ensures package compiles correctly

### Example Project

- **Framework**: Cypress
- **Location**: `example-usage/cypress/e2e/`
- **Purpose**: Demonstrate utilities work in real Cypress environment

### Quality Checks

Run quality checks:

```bash
npm run lint
npm run type-check
npm run build
```

Quality includes:
- Code style consistency
- Type safety verification
- Build success verification
- Documentation accuracy

## Build Process

### 1. TypeScript Compilation

- Uses `tsup` for fast bundling
- Generates both CommonJS and ESM formats
- Creates TypeScript declaration files
- Generates source maps

### 2. Bundle Optimization

- Tree-shaking for unused code removal
- External dependencies (Cypress) excluded
- Clean output directory structure
- Source map generation for debugging

### 3. Quality Checks

- TypeScript compilation
- ESLint code quality checks
- Prettier formatting
- Build verification

## Deployment

### Automated Deployment

The GitHub Actions workflow automatically:

1. **Quality Checks**: Runs linting and type checking on multiple Node.js versions
2. **Builds**: Creates production build artifacts
3. **Publishes**: Deploys to npm on release creation

### Manual Deployment

```bash
# Build and verify
npm run build
npm run lint

# Publish
npm publish --access public
```

## Contributing

### Development Guidelines

1. **Code Style**: Follow ESLint and Prettier rules
2. **Code Quality**: Follow linting and formatting rules
3. **Documentation**: Update README and USAGE.md
4. **Types**: Maintain proper TypeScript types
5. **Backwards Compatibility**: Maintain API compatibility

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make changes and verify build
4. Ensure all checks pass
5. Submit pull request
6. Code review and merge

## Troubleshooting

### Common Issues

1. **Build Failures**: Check TypeScript errors and dependencies
2. **Build Failures**: Check TypeScript compilation and dependencies
3. **Import Errors**: Check package.json exports configuration
4. **Type Errors**: Ensure @types/cypress is installed

### Getting Help

- Check the [README.md](README.md) for basic setup
- Review [USAGE.md](USAGE.md) for examples
- Open an issue on GitHub
- Check the example project for working implementations

## Future Enhancements

### Planned Features

- [ ] Additional utility functions
- [ ] Performance monitoring utilities
- [ ] Enhanced error handling
- [ ] Plugin system for custom utilities
- [ ] Browser compatibility utilities

### Extension Points

The framework is designed to be easily extensible:

- Add new utilities in `src/utils/`
- Extend commands in `src/commands/`
- Add types in `src/types/`
- Update documentation as needed

This project structure provides a solid foundation for a professional-grade Cypress utilities framework that can be easily maintained, extended, and published to npm. 