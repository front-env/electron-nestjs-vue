import { resolve } from 'path';
import { ipcRenderer, clipboard, contextBridge } from 'electron';
const ipcRendererWithPrototype = getObjectWithPrototype(ipcRenderer);

export const electronAPI = {
  ipcRenderer: ipcRendererWithPrototype,
  clipboard: clipboard,
  getPreload: (file: string, ext = '.js') => {
    return resolve(__dirname, file + ext);
  },
};

export function getObjectWithPrototype<T extends ArgumentType>(obj: T): T {
  const newObj = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }
    const value = obj[key];
    if (typeof value === 'function') {
      newObj[key] = value.bind(obj);
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
}

export const exposeInMainWorld = (obj = {}) => {
  contextBridge.exposeInMainWorld('electronAPI', {
    ...electronAPI,
    ...obj,
  });
};

type ArgumentType = Record<string | number | symbol, any>;
