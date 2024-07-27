/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dtos/create-subcategory.dto'
import { UpdateSubcategoryDto } from './dtos/update-subcategory.dto'

@Controller('subcategory')
export class SubcategoryController {

    constructor(private readonly subcategoryService: SubcategoryService){}

    //Endpoint que devuelve una lista de todas las subcategorias
    @Get()
    getAll(){
        return this.subcategoryService.getAll();
    }

    //Endpoint que devuelve una subcategoria segun su id
    @Get(':id')
    getOneById( @Param('id', ParseIntPipe) id: number){
        return this.subcategoryService.getOneById(id);
    }

    //Endpoint que crea un status
    @Post()
    @UsePipes(ValidationPipe)
    createOne(@Body() { categoryId, ...createSubcategoryData}: CreateSubcategoryDto){
        return this.subcategoryService.createOne(categoryId, createSubcategoryData);
    }

    //Endpoint que actualiza un status
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateOne( @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSubcategoryDto ){
        return this.subcategoryService.updateOne(id, dto);
    }

    //Endpoint que elimina un tipo de status
    @Delete(':id')
    deleteOne( @Param('id', ParseIntPipe) id: number ){
        return this.subcategoryService.deleteOne(id)
    }
}
