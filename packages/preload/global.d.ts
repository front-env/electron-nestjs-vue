/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface Window {
  ESAPI?: {
    port: number;
    device: string;
    deviceId: string;
    // ipc: {
    //   send: (action: string, data: SendData) => Promise<unknown>;
    //   on: (event: string, callback: (...args: any[]) => void) => void;
    // };
  };
}
