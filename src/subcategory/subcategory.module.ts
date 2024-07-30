/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
  imports: [PrismaModule],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
