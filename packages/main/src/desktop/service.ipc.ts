import { Injectable } from '@nestjs/common';
import { MainWindowService } from './service.main-window';
import { ipcMain } from 'electron';

@Injectable()
export class IpcService {
  constructor(private readonly mainWindow: MainWindowService) {
    ipcMain.handle('global:port', async () => {
      // const port = await getPort();
      return 2999;
    });

    // ipcMain.handle('global:deviceId', async () => {
    //   return await machineId();
    // });

    // ipcMain.handle('global:getPreloadRoot', async () => {
    //   return path.resolve(__dirname, '../preload');
    // });
  }
}
