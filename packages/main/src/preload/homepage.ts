// import './common';
import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('ESAPI', {
  getPort: () => {
    return ipcRenderer.invoke('global:port');
  },
  getDeviceId: () => '1234',
  getPreloadRoot: () => '5678',
});
