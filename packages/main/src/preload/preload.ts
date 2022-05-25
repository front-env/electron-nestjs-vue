declare global {
  interface Window {
    electronAPI?: typeof electronAPI;
  }
}

import { contextBridge, ipcRenderer, clipboard } from 'electron';
import path from 'path';
const preloadRoot = path.resolve(__dirname, '../preload');

const ipcRendererWithPrototype = withPrototype(ipcRenderer);
export const electronAPI = {
  ipcRenderer: ipcRendererWithPrototype,
  clipboard,
  getPreload: (file: string, ext = '.js') => {
    return path.resolve(preloadRoot, file + ext);
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);
  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;
    if (typeof value === 'function') {
      obj[key] = obj[key].bind(obj);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

window.onload = () => {
  ipcRenderer.once('provide-worker-channel', (event) => {
    // 一旦收到回复, 我们可以这样做...
    const [port] = event.ports;
    console.log('yyyyyyyy', event.ports);
    port.onmessage = (event) => {
      console.log('received result:', event.data);
    };
    port.postMessage(21);
  });
  ipcRenderer.send('request-worker-channel');
};
