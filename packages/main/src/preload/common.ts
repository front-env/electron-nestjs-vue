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
    newObj[key] = obj[key];
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
