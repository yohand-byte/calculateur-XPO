import { build } from 'esbuild';

build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  minify: true,
  outfile: 'dist/main.js',
  sourcemap: true,
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}).catch(() => process.exit(1));
