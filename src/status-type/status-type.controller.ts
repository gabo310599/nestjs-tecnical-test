/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { StatusTypeService } from './status-type.service';
import { CreateStatusTypeDto } from './dtos/create-status-type.dto';
import { UpdateStatusTypeDto } from './dtos/update-status-type.dto';

@Controller('status-type')
export class StatusTypeController {

    constructor(private readonly statusTypeService: StatusTypeService){}

    //Endpoint que devuelve una lista de todos los tipos de status
    @Get()
    getAll(){
        return this.statusTypeService.getAll();
    }

    //Endpoint que devuelve un tipo de status segun su id
    @Get(':id')
    getOneById( @Param('id', ParseIntPipe) id: number){
        return this.statusTypeService.getOneById(id);
    }

    //Endpoint que crea un tipo de status
    @Post()
    @UsePipes(ValidationPipe)
    createOne(@Body() dto: CreateStatusTypeDto){
        return this.statusTypeService.createOne(dto)
    }

    //Endpoint que actualiza un tipo de status
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateOne( @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStatusTypeDto ){
        return this.statusTypeService.updateOne(id, dto);
    }

    //Endpoint que elimina un tipo de status
    @Delete(':id')
    deleteOne( @Param('id', ParseIntPipe) id: number ){
        return this.statusTypeService.deleteOne(id)
    }
}
