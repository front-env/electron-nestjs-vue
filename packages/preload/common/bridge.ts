import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ESAPI", {
  getPort: () => ipcRenderer.invoke("global:port"),
  getDeviceId: () => ipcRenderer.invoke("global:deviceId"),
  getPreloadRoot: () => ipcRenderer.invoke("global:getPreloadRoot"),
});
