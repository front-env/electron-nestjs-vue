import path from 'path';
const preloadRoot = path.resolve(__dirname, '../../preload/main-exports');
export const getPreloadFile = (file: string) => {
  return path.resolve(preloadRoot, file);
};
