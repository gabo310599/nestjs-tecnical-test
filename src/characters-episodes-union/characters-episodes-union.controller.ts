/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCharactersEpisodesUnionDto } from './dto/create-characters-episodes-union.dto';
import { CharactersEpisodesUnionService } from './characters-episodes-union.service';
import { CreateApiEpisodeDto } from 'src/episode/dtos/create-api-episode.dto';

@Controller('characters-episodes-union')
export class CharactersEpisodesUnionController {

    constructor(private readonly charactersEpisodesUnionService: CharactersEpisodesUnionService){}

    //Endpoint que devuelve una lista de todas las uniones
    @Get()
    getAll(){
        return this.charactersEpisodesUnionService.getAll();
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
    
}
