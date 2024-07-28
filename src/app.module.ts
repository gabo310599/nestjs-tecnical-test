/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StatusTypeModule } from './status-type/status-type.module';
import { CategoryTypeModule } from './category-type/category-type.module';
import { StatusModule } from './status/status.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { CharacterModule } from './character/character.module';
import { EpisodeModule } from './episode/episode.module';

@Module({
  imports: [PrismaModule, StatusTypeModule, CategoryTypeModule, StatusModule, SubcategoryModule, CharacterModule, EpisodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
