/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist/electron',
  },
  npmRebuild: false,
  buildDependenciesFromSource: true,
  electronDownload: {
    mirror: 'https://npm.taobao.org/mirrors/electron/',
  },
  // files: ['dist/render/**/*', 'dist/main/**/*', 'dist/preload/**/*'],
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
  },
};

module.exports = config;
