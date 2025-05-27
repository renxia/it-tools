/* eslint-disable n/prefer-global/process */
import { execSync } from 'node:child_process';
import fs from 'node:fs';

async function build(env = 'production') {
  process.env.NODE_OPTIONS = '--max_old_space_size=4096';
  process.env.VITE_VERCEL_ENV = env || 'production';

  execSync('pnpm vite build', { stdio: 'inherit' });

  if (fs.existsSync('./dist/it-tools')) {
    const zipfile = './dist/it-tools.zip';
    if (fs.existsSync(zipfile)) fs.unlinkSync(zipfile);
    execSync(`zip -q -r ${zipfile} dist/it-tools`, { stdio: 'inherit' });
    console.log(`Zip file created: ${zipfile}`);
  }
}

build();
