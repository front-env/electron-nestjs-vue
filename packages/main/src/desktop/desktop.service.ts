import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { app, BrowserWindow } from 'electron';
import desktopConfig from './desktop.config';
import { initIpcMainHandle } from './desktop.ipc-main';
import { getPreloadFile } from '../utils/utils';
import path from 'path';

@Injectable()
export class DesktopService {
  constructor(
    @Inject(desktopConfig.KEY)
    private readonly desktopConfiguration: ConfigType<typeof desktopConfig>,
  ) {
    this.init();
  }
  async init() {
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

    initIpcMainHandle();
    const win = new BrowserWindow({
      width: 1500,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        contextIsolation: true,
        devTools: true,
        webviewTag: true,
        preload: getPreloadFile('homepage.js'),
        allowRunningInsecureContent: true,
      },
    });

    // win.loadURL(this.desktopConfiguration.homepage);
    // win.loadFile(join(__dirname, '../../../views/homepage.html'));
    win.loadFile(this.desktopConfiguration.renderFile);
    // win.loadURL('http://127.0.0.1:5050');

    // if (isDev) {
    //   win.loadURL(this.desktopConfiguration.renderUrl);
    //   // win.loadFile(this.desktopConfiguration.renderFile);
    //   if (process.platform === 'win32') {
    //     const devtools = new BrowserWindow();
    //     win.webContents.setDevToolsWebContents(devtools.webContents);
    //   }
    // } else {
    //   win.loadFile(this.desktopConfiguration.renderFile);
    //   // win.loadURL(this.desktopConfiguration.renderUrl);
    //   win.removeMenu();
    // }
    win.webContents.openDevTools({
      mode: 'right',
    });

    win.on('closed', () => {
      win.destroy();
    });

    return win.webContents;
  }
}
