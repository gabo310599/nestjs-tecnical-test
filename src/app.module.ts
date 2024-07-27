/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StatusTypeModule } from './status-type/status-type.module';
import { CategoryTypeModule } from './category-type/category-type.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [PrismaModule, StatusTypeModule, CategoryTypeModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
