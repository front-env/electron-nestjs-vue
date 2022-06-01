import { Injectable } from '@nestjs/common';
import { MainWindowService } from './service.main-window';
import { BrowserWindow, dialog, ipcMain, IpcMainEvent } from 'electron';
import { CommonService } from './service.common';
import { getPort } from '../utils/port';

interface IOpenWindow {
  url: string;
  width?: number;
  height?: number;
  preload?: string;
  devTools?: boolean;
}
@Injectable()
export class IpcService {
  constructor(
    private readonly mainWindowService: MainWindowService,
    private readonly commonService: CommonService,
  ) {
    ipcMain.handle('GetPort', () => getPort());
    ipcMain.handle('OpenWindow', async (event, opts: IOpenWindow) => {
      const win = new BrowserWindow({
        width: opts.width || 1200,
        height: opts.height || 600,

        webPreferences: {
          nodeIntegration: true,
          webSecurity: false,
          contextIsolation: true,
          devTools: true,
          webviewTag: true,
          preload: opts.preload,
          allowRunningInsecureContent: true,
        },
      });
      await win.loadURL(opts.url);
      if (opts.devTools !== false) {
        win.webContents.openDevTools();
      }
      return {
        id: win.id,
      };
    });

    ipcMain.handle('OpenDialog', async () => {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory', 'openFile'],
      });
      if (canceled) {
        return;
      } else {
        return filePaths[0];
      }
    });

    ipcMain.on('MessageChannelPort', (event: IpcMainEvent) => {
      const port = event.ports[0];
      this.mainWindowService.win.webContents.postMessage('message-port', null, [
        port,
      ]);
      port.start();
    });
  }
}
