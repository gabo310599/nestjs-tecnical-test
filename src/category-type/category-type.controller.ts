/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryTypeService } from './category-type.service';
import { CreateCategoryTypeDto } from './dtos/create-category-type.dto';
import { UpdateCategoryTypeDto } from './dtos/update-category-type.dto';

@Controller('category-type')
export class CategoryTypeController {

    constructor(private readonly categoryTypeService: CategoryTypeService){}

    //Endpoint que devuelve una lista de todos los tipos de categorias
    @Get()
    getAll(){
        return this.categoryTypeService.getAll();
    }

    //Endpoint que devuelve un tipo de categoria segun su id
    @Get(':id')
    getOneById( @Param('id', ParseIntPipe) id: number){
        return this.categoryTypeService.getOneById(id);
    }

    //Endpoint que crea un tipo de categoria
    @Post()
    @UsePipes(ValidationPipe)
    createOne(@Body() dto: CreateCategoryTypeDto){
        return this.categoryTypeService.createOne(dto)
    }

    //Endpoint que actualiza un tipo de categoria
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateOne( @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryTypeDto ){
        return this.categoryTypeService.updateOne(id, dto);
    }

    //Endpoint que elimina un tipo de categoria
    @Delete(':id')
    deleteOne( @Param('id', ParseIntPipe) id: number ){
        return this.categoryTypeService.deleteOne(id)
    }

    //Endpoint que migra los tipos de categorias
    @Post('/migrate')
    @UsePipes(ValidationPipe)
    migrateCategoryTypes(@Body() data){
        return this.categoryTypeService.migrateCategoryTypes(data);
    }
}
