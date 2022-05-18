import { ipcMain } from 'electron';
import { getPort } from '../utils/get-port';
import { machineId } from 'node-machine-id';

export const initIpcMainHandle = () => {
  ipcMain.handle('global:port', async () => {
    const port = await getPort();
    return port;
  });

  ipcMain.handle('global:deviceId', async () => {
    return await machineId();
  });
};
