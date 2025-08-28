import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/commands/index.ts', 'src/utils/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  external: ['cypress'],
  onSuccess: 'npm run type-check',
}); 