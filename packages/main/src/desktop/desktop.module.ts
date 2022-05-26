import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DesktopService } from './desktop.service';
import desktopConfig from './desktop.config';
import { MainWindowService } from './service.main-window';
import { IpcService } from './service.ipc';
import { CommonService } from './service.common';

@Module({
  imports: [ConfigModule.forFeature(desktopConfig)],
  providers: [DesktopService, CommonService, MainWindowService, IpcService],
})
export class DesktopModule {}
