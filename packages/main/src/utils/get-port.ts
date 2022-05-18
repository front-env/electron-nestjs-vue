import { getPort as getServicePort } from 'get-port-please';

let port = null;
export const getPort = async () => {
  if (!port) {
    console.log('=======');
    port = await getServicePort({
      port: 2999,
      ports: [...new Array(50)].map((item, index) => 2900 + index),
    });
  }
  console.log('port----: ', port);
  return port;
};
