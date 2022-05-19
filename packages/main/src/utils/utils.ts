import path from 'path';
const preloadRoot = path.resolve(__dirname, '../preload');
export const getPreloadFile = (file: string) => {
  return path.resolve(preloadRoot, file);
};
