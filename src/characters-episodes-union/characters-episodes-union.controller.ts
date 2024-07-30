/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCharactersEpisodesUnionDto } from './dto/create-characters-episodes-union.dto';
import { CharactersEpisodesUnionService } from './characters-episodes-union.service';
import { CreateApiEpisodeDto } from '../episode/dtos/create-api-episode.dto';
import { DeleteCharactersEpisodesUnionDto } from './dto/delete-characters-episodes-union.dto'

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
        return this.charactersEpisodesUnionService.createOne(dto)
    }

    //Endpoint que migra los status types 
    @Post('/migrate')
    @UsePipes(ValidationPipe)
    migrateStatusTypes(@Body() data: CreateApiEpisodeDto[]){

        try{

            for(const element of data){
                this.charactersEpisodesUnionService.migrateUnion(element);
            }
            return{ msg: 'Peticion correcta'}

        }catch(error: any){
            console.log(error.message)
        }
    }

    //Endpoint que devuelve personajes y episodios segun su status
    @Get('/filter/status')
    filterByStatus( @Query('status') statusName: string){
        return this.charactersEpisodesUnionService.filterByStatus(statusName);
    }

    //Endpoint que devuelve personajes y episodios segun su status
    @Get('/filter/charecter_by_season/season')
    filterCharacterBySeason( @Query('season') seasonName: string){
        return this.charactersEpisodesUnionService.filterCharacterBySeason(seasonName);
    }

    //Endpoint que elimina un personajes de un episodio 
    @Delete('/delete_character_from_episode')
    deleteCharacterFromEpisode( @Body() dto: DeleteCharactersEpisodesUnionDto){
        return this.charactersEpisodesUnionService.deleteCharacterFromEpisode(dto);
    }
}
