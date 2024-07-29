/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStatusDto } from './dtos/create-status.dto';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {

    constructor(private readonly statusService: StatusService){}

    //Endpoint que devuelve una lista de todos los status
    @Get()
    getAll(){
        return this.statusService.getAll();
    }

    //Endpoint que devuelve un status segun su id
    @Get(':id')
    getOneById( @Param('id', ParseIntPipe) id: number){
        return this.statusService.getOneById(id);
    }

    //Endpoint que crea un status
    @Post()
    @UsePipes(ValidationPipe)
    createOne(@Body() { typeId, ...createStatusData}: CreateStatusDto){
        return this.statusService.createOne(typeId, createStatusData);
    }

    //Endpoint que actualiza un status
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateOne( @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStatusDto ){
        return this.statusService.updateOne(id, dto);
    }

    //Endpoint que elimina un tipo de status
    @Delete(':id')
    deleteOne( @Param('id', ParseIntPipe) id: number ){
        return this.statusService.deleteOne(id)
    }

    //Endpoint que crea un status
    @Post('/migrate')
    migrateStatus(){
        return this.statusService.migrateStatus();
    }
}
