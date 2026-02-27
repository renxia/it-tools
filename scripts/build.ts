/* eslint-disable n/prefer-global/process */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { optimizePrerenderedHTML } from './optimize-prerendered-html';

async function build(env = 'production') {
  process.env.NODE_OPTIONS = '--max_old_space_size=16384';
  process.env.VITE_VERCEL_ENV = env || 'production';

  execSync('node --max_old_space_size=20480 node_modules/vite/bin/vite.js build', {
    stdio: 'inherit', env: {
      // NODE_OPTIONS: '--max_old_space_size=16384',
      VITE_VERCEL_ENV: env || 'production',
      NODE_ENV: env || 'production',
    }
  });

  await optimizePrerenderedHTML();

  if (fs.existsSync('./dist/it-tools')) {
    const zipfile = './dist/it-tools.zip';

    if (fs.existsSync(zipfile)) {
      fs.unlinkSync(zipfile);
    }

    execSync('zip -q -r it-tools.zip it-tools', { stdio: 'inherit', cwd: './dist' });
    console.log(`Zip file created: ${zipfile}`);
  }
}

build();
