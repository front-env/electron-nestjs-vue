import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DesktopModule } from './desktop/desktop.module';
import { app } from 'electron';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import os from 'os';
class EmptyModule {}
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(os.homedir(), 'db.sqlite'),
      autoLoadEntities: true,
      synchronize: true,
    }),
    app ? DesktopModule : EmptyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
