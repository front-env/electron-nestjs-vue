import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { app, BrowserWindow, Menu } from 'electron';
import desktopConfig from './desktop.config';
import { CommonService } from './service.common';

@Injectable()
export class MainWindowService {
  win: BrowserWindow;
  constructor(
    @Inject(desktopConfig.KEY)
    private readonly desktopConfiguration: ConfigType<typeof desktopConfig>,
    private commonService: CommonService,
  ) {
    const { isDev } = this.commonService;

    const win = (this.win = new BrowserWindow({
      width: 1500,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        webSecurity: false,
        contextIsolation: true,
        devTools: true,
        webviewTag: true,
        preload: this.commonService.preload,
        allowRunningInsecureContent: true,
      },
    }));

    const menu = Menu.buildFromTemplate([
      {
        label: app.name,
        submenu: [
          {
            click: () => win.webContents.send('update-counter', 1),
            label: 'Increment',
          },
          {
            click: () => win.webContents.send('update-counter', -1),
            label: 'Decrement',
          },
        ],
      },
    ]);

    Menu.setApplicationMenu(menu);

    if (isDev) {
      win.loadURL(this.desktopConfiguration.renderUrl);
    } else {
      win.loadFile(this.desktopConfiguration.renderFile);
    }
    // win.loadURL('https://www.douyin.com');
    this.commonService.processWindow(win);
  }
}
