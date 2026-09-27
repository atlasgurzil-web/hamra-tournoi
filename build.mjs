import { build } from 'vite';

async function run() {
  try {
    console.log('Starting Vite build in workspace...');
    await build();
    console.log('Vite build completed successfully!');
  } catch (err) {
    console.error('Vite build error:', err);
    process.exit(1);
  }
}

run();
