import { ipcRenderer, contextBridge } from 'electron';
window.addEventListener('DOMContentLoaded', async function () {
  const channel = new MessageChannel();

  const port1 = channel.port1;
  const port2 = channel.port2;

  port2.postMessage({ answer: 42 });

  ipcRenderer.postMessage('port', null, [port1]);
  port2.onmessage = (evt: MessageEvent) => {
    console.log('onmessage: ', evt.data);
  };

  contextBridge.exposeInMainWorld('port2', port2);
  // Object.assign(window, {
  //   port2,
  // });
});
