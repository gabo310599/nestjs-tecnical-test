import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [PrismaModule],
  exports: [StatusService],
})
export class StatusModule {}
