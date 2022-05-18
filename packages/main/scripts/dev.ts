import { spawn } from 'child_process';
import electron from 'electron';
import TscWatchClient from 'tsc-watch/client';
const watch = new TscWatchClient();

const config = {
  hot: true,
};

// watch.on('started', () => {
//   console.log('Compilation started');
// });

watch.on('first_success', () => {
  console.log('First success!');

  let electronProcess = spawn(electron as unknown as string, ['.'], {
    stdio: 'inherit',
  });

  setTimeout(() => {
    watch.on('success', () => {
      if (config.hot) {
        electronProcess.kill();
        electronProcess = spawn(electron as unknown as string, ['.'], {
          stdio: 'inherit',
        });
      }
    });

    watch.on('compile_errors', () => {
      // Your code goes here...
      console.log('error');
    });
  }, 0);
});

watch.start('--project', './tsconfig.build.json');

try {
  // do something...
} catch (e) {
  watch.kill(); // Fatal error, kill the compiler instance.
}
