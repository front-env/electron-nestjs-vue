/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface Window {
  ESAPI?: {
    getPort: () => Promise<string>;
    getDeviceId: () => Promise<string>;
    getPreloadRoot: () => Promise<string>;
    // ipc: {
    //   send: (action: string, data: SendData) => Promise<unknown>;
    //   on: (event: string, callback: (...args: any[]) => void) => void;
    // };
  };
}
