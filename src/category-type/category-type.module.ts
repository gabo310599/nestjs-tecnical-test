import { Module } from '@nestjs/common';
import { CategoryTypeController } from './category-type.controller';
import { CategoryTypeService } from './category-type.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CategoryTypeController],
  providers: [CategoryTypeService],
  imports: [PrismaModule],
})
export class CategoryTypeModule {}
