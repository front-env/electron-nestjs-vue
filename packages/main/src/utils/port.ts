import { getPort as getServicePort, GetPortInput } from 'get-port-please';

let port = null;
export const findPort = async (params: GetPortInput) => {
  if (!port) {
    port = await getServicePort(params);
  }
};

export const getPort = () => {
  if (!port) {
    throw new Error('please call the bootstrapPort first!');
  }
  return port;
};
