declare global {
  interface Window {
    electronAPI?: typeof electronAPI;
  }
}

import { contextBridge, ipcRenderer, clipboard } from 'electron';
import path from 'path';
const preloadRoot = path.resolve(__dirname, '../preload');

// const ipcRendererWithPrototype = withPrototype(ipcRenderer);
export const electronAPI = {
  // ipcRenderer: ipcRendererWithPrototype,
  ipcRenderer: {
    ...ipcRenderer,
    on: ipcRenderer.on,
  },
  clipboard,
  getPreload: (file: string, ext = '.js') => {
    return path.resolve(preloadRoot, file + ext);
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// function withPrototype(obj: Record<string, any>) {
//   const protos = Object.getPrototypeOf(obj);
//   for (const [key, value] of Object.entries(protos)) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) continue;
//     if (typeof value === 'function') {
//       obj[key] = obj[key].bind(obj);
//     } else {
//       obj[key] = value;
//     }
//   }
//   return obj;
// }

// function withPrototype(obj: Record<string, any>) {
//   const protos = Object.getPrototypeOf(obj);

//   for (const [key, value] of Object.entries(protos)) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

//     if (typeof value === 'function') {
//       // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
//       obj[key] = function (...args: any) {
//         return value.call(obj, ...args);
//       };
//     } else {
//       obj[key] = value;
//     }
//   }
//   return obj;
// }

ipcRenderer.once('message-port', (event) => {
  const [port] = event.ports;
  port.onmessage = (event) => {
    console.log('received result:', event.data);
  };
  port.postMessage(21);
});
