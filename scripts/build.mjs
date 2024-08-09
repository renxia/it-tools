/* eslint-disable n/prefer-global/process */
import { execSync } from 'node:child_process';

async function build(env = 'production') {
  process.env.NODE_OPTIONS = '--max_old_space_size=4096';
  process.env.VITE_VERCEL_ENV = env || 'production';

  execSync('pnpm vite build', { stdio: 'inherit' });
}

build();
