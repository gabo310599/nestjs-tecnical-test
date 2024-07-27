import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StatusService } from '../status/status.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, StatusService],
  imports: [PrismaModule],
})
export class CharacterModule {}
