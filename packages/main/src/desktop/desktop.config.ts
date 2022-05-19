import { registerAs } from '@nestjs/config';
import path from 'path';
import { getPort } from '../utils/get-port';
export default registerAs('desktop', async () => {
  const port = await getPort();
  return {
    renderUrl: 'http://127.0.0.1:5678',
    renderFile: path.join(__dirname, '../../renderer/index.html'),
    // renderUrl: 'https://www.bing.com',

    // homepage: 'http://127.0.0.1:4000/album/list',
    homepage: `http://127.0.0.1:${port}/desktop`,
    // 'https://www.douyin.com/search/%E5%B7%A5%E5%8E%82?source=switch_tab&type=user',
  };
});
