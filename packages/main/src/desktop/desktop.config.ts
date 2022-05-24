import { registerAs } from '@nestjs/config';
import path from 'path';
import { getPort } from '../utils/get-port';
export default registerAs('desktop', async () => {
  const port = await getPort();
  return {
    renderUrl: 'http://127.0.0.1:5678',
    renderFile: path.join(__dirname, '../../renderer/index.html'),
    homepage: `http://127.0.0.1:${port}/desktop`,
  };
});
