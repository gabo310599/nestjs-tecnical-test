/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { CreateEpisodeDto } from './dtos/create-episode.dto';

@Controller('episode')
export class EpisodeController {

    constructor(private readonly episodeService: EpisodeService  ){}

    //Endpoint que devuelve una lista de todos los episodios
    @Get()
    getAll(){
        return this.episodeService.getAll();
    }

    //Endpoint que devuelve un personaje segun su id
    @Get(':id')
    getOneById( @Param('id', ParseIntPipe) id: number){
        return this.episodeService.getOneById(id);
    }

    //Endpoint que crea un personaje
    @Post()
    @UsePipes(ValidationPipe)
    createOne(@Body() dto: CreateEpisodeDto){
        return this.episodeService.createOne(dto);
    }

    //Endpoint que actualiza un personaje
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateOne( @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEpisodeDto ){
        return this.episodeService.updateOne(id, dto);
    }

    //Endpoint que elimina un personaje (desactiva)
    @Delete(':id')
    deleteOne( @Param('id', ParseIntPipe) id: number ){
        return this.episodeService.deleteOne(id)
    }

    //Endpoint que crea un personaje
    @Post('/migrate')
    @UsePipes(ValidationPipe)
    migrateCharacters(@Body() data: [JSON]){
        return this.episodeService.migrateEpisodes(data);
    }
}
