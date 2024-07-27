import { Module } from '@nestjs/common';
import { StatusTypeController } from './status-type.controller';
import { StatusTypeService } from './status-type.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [StatusTypeController],
  providers: [StatusTypeService],
  imports: [PrismaModule],
})
export class StatusTypeModule {}
