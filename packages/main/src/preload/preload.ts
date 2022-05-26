import { ipcRenderer } from 'electron';
import { exposeInMainWorld } from './common';

ipcRenderer.once('message-port', (event) => {
  const [port] = event.ports;
  port.onmessage = (event) => {
    console.log('received result:', event.data);
  };
  port.postMessage(21);
});

exposeInMainWorld();
