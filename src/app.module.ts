/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StatusTypeModule } from './status-type/status-type.module';

@Module({
  imports: [PrismaModule, StatusTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
