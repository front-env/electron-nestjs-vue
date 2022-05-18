import { contextBridge, ipcRenderer } from "electron";
import axios from "axios";

contextBridge.exposeInMainWorld("ESAPI", {
  getPort: () => ipcRenderer.invoke("global:port"),
  getDeviceId: () => ipcRenderer.invoke("global:deviceId"),
  getPreloadRoot: () => ipcRenderer.invoke("global:getPreloadRoot"),
});

export const getAPi = (() => {
  let globalAPi = null;
  return async () => {
    if (globalAPi) {
      return globalAPi;
    }
    const port = await ipcRenderer.invoke("global:port");
    const baseURL = `http://127.0.0.1:${port}`;
    globalAPi = axios.create({
      baseURL,
    });
    globalAPi.interceptors.response.use(
      function (response) {
        return response.data;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    return globalAPi;
  };
})();
