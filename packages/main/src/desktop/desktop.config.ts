import { registerAs } from '@nestjs/config';
import path from 'path';
export default registerAs('desktop', async () => {
  return {
    renderUrl: 'http://127.0.0.1:5678',
    renderFile: path.join(__dirname, '../../renderer/index.html'),
  };
});
