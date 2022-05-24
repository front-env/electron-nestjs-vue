import { Injectable } from '@nestjs/common';
import { IpcService } from './service.ipc';
import { MainWindowService } from './service.main-window';

@Injectable()
export class DesktopService {
  constructor(
    private readonly mainWindow: MainWindowService,
    private readonly ipcService: IpcService,
  ) {}
}
