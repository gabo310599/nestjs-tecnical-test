import { Module } from '@nestjs/common';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StatusService } from '../status/status.service';
import { SubcategoryService } from '../subcategory/subcategory.service';

@Module({
  controllers: [EpisodeController],
  providers: [EpisodeService, StatusService, SubcategoryService],
  imports: [PrismaModule],
})
export class EpisodeModule {}
