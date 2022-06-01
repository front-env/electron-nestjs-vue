import { getPort as getServicePort, GetPortInput } from 'get-port-please';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
const file = path.resolve(os.homedir(), '.vscj', 'env.json');

let port = null;
export const findPort = async (params: GetPortInput) => {
  if (!port) {
    fs.removeSync(file);
    port = await getServicePort(params);
    fs.writeJsonSync(file, {
      port,
    });
  }
};

export const getPort = () => {
  if (fs.existsSync(file)) {
    const data = fs.readJsonSync(file);
    return data.port;
  } else {
    throw new Error('please call the bootstrapPort first!');
  }
};
