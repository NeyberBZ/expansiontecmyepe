#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const projectRoot = process.cwd();
// Apuntamos al ejecutable JS real de esbuild-wasm que emula al binario nativo
const wasmBin = path.join(projectRoot, 'node_modules/esbuild-wasm/bin/esbuild');

// Reenviamos todos los argumentos que Astro/Vite le manden a esbuild
const child = spawn(process.execPath, [wasmBin, ...process.argv.slice(2)], {
  stdio: 'inherit'
});

child.on('exit', (code) => {
  process.exit(code);
});
