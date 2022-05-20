import { getPort as getServicePort } from 'get-port-please';

let port = null;
export const getPort = async () => {
  if (!port) {
    port = await getServicePort({
      port: 2999,
      portRange: [2900, 65535],
    });
  }
  return port;
};
