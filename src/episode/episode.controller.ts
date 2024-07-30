/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreateApiEpisodeDto } from './dtos/create-api-episode.dto';

@Controller('episode')
export class EpisodeController {

    constructor(private readonly episodeService: EpisodeService  ){}

    //Endpoint que devuelve una lista de todos los episodios
    @Get()
    getAll(@Query('page') pageNumber: string){
        try{
            return this.episodeService.getAll(Number(pageNumber));
        }catch(error){
            console.log(error);
        }
    }

    //Endpoint que devuelve un episodio segun su id
    @Get(':id')
    getOneById( @Param('id', ParseIntPipe) id: number){
        return this.episodeService.getOneById(id);
    }

    //Endpoint que crea un episodio
    @Post()
    @UsePipes(ValidationPipe)
    createOne(@Body() dto: CreateEpisodeDto){
        return this.episodeService.createOne(dto);
    }

    //Endpoint que actualiza un episodio
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateOne( @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEpisodeDto ){
        return this.episodeService.updateOne(id, dto);
    }

    //Endpoint que elimina un episodio (desactiva)
    @Delete(':id')
    deleteOne( @Param('id', ParseIntPipe) id: number ){
        return this.episodeService.deleteOne(id)
    }

    //Endpoint que migra los episodios de la API externa
    @Post('/migrate')
    @UsePipes(ValidationPipe)
    migrateEpisodes(@Body() dto: CreateApiEpisodeDto[]){
        return this.episodeService.migrateEpisodes(dto);
    }

    //Endpoint que devuelve personajes segun su especie
    @Get('/filter/season')
    getBySeason( @Query('season') seasonName: string){
        return this.episodeService.getBySpecies(seasonName);
    }
}
