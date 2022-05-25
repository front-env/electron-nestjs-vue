import { Injectable } from '@nestjs/common';
import { MainWindowService } from './service.main-window';
import {
  BrowserWindow,
  dialog,
  ipcMain,
  IpcMainEvent,
  MessageChannelMain,
} from 'electron';
import { CommonService } from './service.common';

interface IOpenWindow {
  url: string;
  width?: number;
  height?: number;
  preload?: string;
  devTools?: boolean;
}
@Injectable()
export class IpcService {
  private window1: BrowserWindow;
  constructor(
    private readonly mainWindowService: MainWindowService,
    private readonly commonService: CommonService,
  ) {
    ipcMain.handle('OpenWindow', async (event, opts: IOpenWindow) => {
      const win = (this.window1 = new BrowserWindow({
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
      }));
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

    // ipcMain.on('request-worker-channel', (event: Electron.IpcMainEvent) => {
    //   if (
    //     event.senderFrame === this.mainWindowService.win.webContents.mainFrame
    //   ) {
    //     const { port1, port2 } = new MessageChannelMain();

    //     this.window1.webContents.postMessage('new-client', null, [port1]);
    //     this.mainWindowService.win.webContents.postMessage(
    //       'provide-worker-channel',
    //       null,
    //       [port2],
    //     );
    //     // event.senderFrame.postMessage('provide-worker-channel', null, [port2]);
    //   }
    // });
    ipcMain.on('port', (event: IpcMainEvent) => {
      const port = event.ports[0];
      this.mainWindowService.win.webContents.postMessage('message-port', null, [
        port,
      ]);
      port.start();
    });
  }
}
