import { ipcRenderer, IpcRendererEvent } from 'electron';
window.addEventListener('DOMContentLoaded', async function () {
  // const channel = new MessageChannel();
  // const { port1, port2 } = channel;

  // port1.onmessage = () => {
  //   alert('mmmmmm');
  // };

  // ipcRenderer.postMessage('port', 'message from window1', [port1]);
  // setTimeout(() => {
  //   port2.postMessage({ answer: 42 });
  // }, 5000);

  ipcRenderer.on('new-client', (event: IpcRendererEvent) => {
    const [port] = event.ports;
    port.onmessage = (event) => {
      // 事件数据可以是任何可序列化的对象 (事件甚至可以
      // 携带其他 MessagePorts 对象!)

      port.postMessage('message from window1');
    };
  });
});
