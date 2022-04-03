import { resolve } from 'path';
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import typescript from '@rollup/plugin-typescript';

const resolvePath = (str: string) => resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: resolvePath('src/lib/index.ts'),
      formats: ['cjs', 'es'],
      fileName: (format) => `giscus.${format}.js`,
    },
    rollupOptions: {
      external: ['preact'],
      output: {
        globals: {
          preact: 'Preact',
        },
      },
      plugins: [
        typescript({
          target: 'es2020',
          rootDir: resolvePath('src/lib'),
          declaration: true,
          declarationDir: resolvePath('dist'),
        }),
      ],
    },
  },
});