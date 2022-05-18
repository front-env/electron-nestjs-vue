import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DesktopService } from './desktop.service';
import desktopConfig from './desktop.config';
@Module({
  imports: [ConfigModule.forFeature(desktopConfig)],
  providers: [DesktopService],
})
export class DesktopModule {}
