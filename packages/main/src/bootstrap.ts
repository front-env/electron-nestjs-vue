import { app } from 'electron';

export const bootstrapElectron = async () => {
  if (app) {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    const isDev = !app.isPackaged;
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    if (isDev) {
      if (process.platform === 'win32') {
        process.on('message', (data) => {
          if (data === 'graceful-exit') {
            app.quit();
          }
        });
      } else {
        process.on('SIGTERM', () => {
          app.quit();
        });
      }
    }
    await app.whenReady();
  }
};
