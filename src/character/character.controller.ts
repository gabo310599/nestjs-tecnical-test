/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dtos/create-character.dto';
import { UpdateCharacterDto } from './dtos/update-character.dto';
import { CreateApiCharacterDto } from './dtos/create-api-character.dto';


@Controller('character')
export class CharacterController {

    constructor(private readonly charcaterService: CharacterService ){}

    //Endpoint que devuelve una lista de todos los personajes
    @Get()
    getAll(){
        return this.charcaterService.getAll();
    }

    //Endpoint que devuelve un personaje segun su id
    @Get(':id')
    getOneById( @Param('id', ParseIntPipe) id: number){
        return this.charcaterService.getOneById(id);
    }

    //Endpoint que crea un personaje
    @Post()
    @UsePipes(ValidationPipe)
    createOne(@Body() dto: CreateCharacterDto){
        return this.charcaterService.createOne(dto);
    }

    //Endpoint que actualiza un personaje
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateOne( @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCharacterDto ){
        return this.charcaterService.updateOne(id, dto);
    }

    //Endpoint que elimina un personaje (desactiva)
    @Delete(':id')
    deleteOne( @Param('id', ParseIntPipe) id: number ){
        return this.charcaterService.deleteOne(id)
    }

    //Endpoint que crea un personaje
    @Post('/migrate')
    @UsePipes(ValidationPipe)
    migrateCharacters(@Body() dto: CreateApiCharacterDto[]){
        return this.charcaterService.migrateCharacters(dto);
    }
}
