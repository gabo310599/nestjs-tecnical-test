import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StatusService } from '../status/status.service';
import { SubcategoryService } from '../subcategory/subcategory.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, StatusService, SubcategoryService],
  imports: [PrismaModule],
  exports: [CharacterService],
})
export class CharacterModule {}
