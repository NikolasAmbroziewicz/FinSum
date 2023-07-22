/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import {
  configDefaults,
  defineConfig,
  mergeConfig,
  type UserConfig,
} from 'vitest/config';
import viteConfig from './vite.config';

const config = mergeConfig(
  viteConfig, // Extending from an existing Vite configuration (`vite.config.ts` file)
  defineConfig({
    test: {
      ...configDefaults, // Extending Vitest's default options
      globals: true,
      environment: 'happy-dom',
    },
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 3000
    }
  }) as UserConfig
);

export default config;
