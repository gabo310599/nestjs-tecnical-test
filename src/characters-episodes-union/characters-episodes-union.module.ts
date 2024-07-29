/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CharactersEpisodesUnionController } from './characters-episodes-union.controller';
import { CharactersEpisodesUnionService } from './characters-episodes-union.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CharactersEpisodesUnionController],
  providers: [CharactersEpisodesUnionService],
  imports: [PrismaModule],
})
export class CharactersEpisodesUnionModule {}
