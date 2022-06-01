import type Electron from "electron";

export interface IElectronAPI {
  ipcRenderer: typeof Electron.ipcRenderer;
  clipboard: typeof Electron.clipboard;
  getPreload: (file: string, ext?: string) => string;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
