import { Injectable } from '@nestjs/common';
import path from 'path';
import { app, BrowserWindow } from 'electron';
const preloadRoot = path.resolve(__dirname, '../preload');

@Injectable()
export class CommonService {
  isDev = !app.isPackaged;
  preload = path.resolve(__dirname, '../preload/preload.js');
  async prepare() {
    const { isDev } = this;
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
  getPreloadFile(file: string, ext = '.js') {
    return path.resolve(preloadRoot, `${file}${ext}`);
  }
  processWindow(win: BrowserWindow) {
    if (this.isDev) {
      if (process.platform === 'win32') {
        const devtools = new BrowserWindow();
        win.webContents.setDevToolsWebContents(devtools.webContents);
      } else {
        win.webContents.openDevTools({
          mode: 'right',
        });
      }
    } else {
      win.removeMenu();
    }

    win.on('closed', () => {
      win.destroy();
    });
  }
}
