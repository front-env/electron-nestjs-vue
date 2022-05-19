import axios from 'axios';
import { ipcRenderer } from 'electron';

export const getAPi = (() => {
  let globalAPi = null;
  return async () => {
    if (globalAPi) {
      return globalAPi;
    }
    const port = await ipcRenderer.invoke('global:port');
    // const port = window.ESAPI ? await window.ESAPI.getPort() : '2900';
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
      },
    );
    return globalAPi;
  };
})();
