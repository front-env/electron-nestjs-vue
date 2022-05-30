import { Injectable } from '@nestjs/common';
import path from 'path';
import { app, BrowserWindow } from 'electron';
const preloadRoot = path.resolve(__dirname, '../preload');

@Injectable()
export class CommonService {
  isDev = !app.isPackaged;
  preload = path.resolve(__dirname, '../preload/preload.js');
  getPreloadFile(file: string, ext = '.js') {
    return path.resolve(preloadRoot, `${file}${ext}`);
  }
  processWindow(win: BrowserWindow) {
    if (this.isDev) {
      // if (process.platform === 'win32') {
      //   const devtools = new BrowserWindow();
      //   win.webContents.setDevToolsWebContents(devtools.webContents);
      // } else {
      //   win.webContents.openDevTools({
      //     mode: 'right',
      //   });
      // }
      win.webContents.openDevTools({
        mode: 'right',
      });
    } else {
      win.removeMenu();
    }

    win.on('closed', () => {
      win.destroy();
    });
  }
}
