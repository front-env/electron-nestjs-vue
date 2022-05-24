import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BrowserWindow } from 'electron';
import desktopConfig from './desktop.config';
import { CommonService } from './service.common';

@Injectable()
export class MainWindowService {
  constructor(
    @Inject(desktopConfig.KEY)
    private readonly desktopConfiguration: ConfigType<typeof desktopConfig>,
    private commonService: CommonService,
  ) {
    const { isDev } = this.commonService;
    const win = new BrowserWindow({
      width: 1500,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        webSecurity: false,
        contextIsolation: true,
        devTools: true,
        webviewTag: true,
        preload: this.commonService.getPreloadFile('homepage'),
        allowRunningInsecureContent: true,
      },
    });

    if (isDev) {
      win.loadURL(this.desktopConfiguration.renderUrl);
    } else {
      win.loadFile(this.desktopConfiguration.renderFile);
    }
    this.commonService.processWindow(win);
  }
}
