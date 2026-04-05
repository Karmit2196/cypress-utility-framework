import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/commands/index.ts', 'src/utils/index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // ✅ Enable TypeScript declarations
  splitting: true, // ✅ Enable code splitting for better tree-shaking
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false, // Keep false for debugging, can be enabled for production
  external: ['cypress'],
  // Additional optimizations
  target: 'es2020', // Match TypeScript target
  outDir: 'dist',
  // Ensure proper module resolution
  esbuildOptions(options) {
    options.mainFields = ['module', 'main'];
  },
});
