/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCharactersEpisodesUnionDto } from './dto/create-characters-episodes-union.dto';
import { CharactersEpisodesUnionService } from './characters-episodes-union.service';

@Controller('characters-episodes-union')
export class CharactersEpisodesUnionController {

    constructor(private readonly charactersEpisodesUnionService: CharactersEpisodesUnionService){}

    //Endpoint que devuelve una lista de todas las uniones
    @Get()
    getAll(){
        return this.charactersEpisodesUnionService.getAll();
    }

    //Endpoint que devuelve una union segun su id
    @Get(':id')
    getOneById( @Param('id', ParseIntPipe) id: number){
        return this.charactersEpisodesUnionService.getOneById(id);
    }

    //Endpoint que crea una union
    @Post()
    @UsePipes(ValidationPipe)
    createOne(@Body() dto: CreateCharactersEpisodesUnionDto){
        return this.charactersEpisodesUnionService.createOne(0,0, dto)
    }

    //Endpoint que elimina una union
    @Delete(':id')
    deleteOne( @Param('id', ParseIntPipe) id: number ){
        return this.charactersEpisodesUnionService.deleteOne(id)
    }

    //Endpoint que migra los status types 
    /*
    @Post('/migrate')
    @UsePipes(ValidationPipe)
    migrateStatusTypes(@Body() data){
        return this.statusTypeService.migrateStatusTypes(data);
    }
    */
}
