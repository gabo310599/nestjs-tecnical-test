/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharactersEpisodesUnionDto } from './dto/create-characters-episodes-union.dto';
import { CreateApiEpisodeDto } from '../episode/dtos/create-api-episode.dto';
import { UpdateCharactersEpisodesUnionDto } from './dto/update-characters-episodes-union.dto';
import { DeleteCharactersEpisodesUnionDto } from './dto/delete-characters-episodes-union.dto';

@Injectable()
export class CharactersEpisodesUnionService {

    constructor(
        private readonly prisma: PrismaService,
    ){}

    //Metodo que verifica que dos segmentos de participacion no coincidan
    validateParticipation(init: string, finish: string, oldInit?: string, oldFinish?: string){

        //Calculamos los segundos de inicio y los de fin (pasamos de min a s)
        const minutesInit = Number(init.slice(0,2));
        const secondsInit = Number(init.slice(3)) + (minutesInit * 60);
        const minutesFinish = Number(finish.slice(0,2));
        const secondsFinish = Number(finish.slice(3)) + (minutesFinish * 60);
 
        //Confirmamos que la duracion sea menor a 60 mins
        if(secondsInit > 3600 || secondsFinish > 3600){
            return{
                msg: "Duration is longer than expected",
                status: false
            }
        }
        
        //Confirmamos que init no sea mayor a finish
        if(secondsInit >= secondsFinish){
            return {
                msg: "Duration is longer than expected",
                status: false 
            }
        }

        //Confirmamos si existe oldInit y oldFinish
        if(oldFinish && oldInit){

            //Calculamos los segundos de inicio y los de fin (pasamos de min a s)
            const oldMinutesInit = Number(oldInit.slice(0,2));
            const oldSecondsInit = Number(oldInit.slice(3)) + (oldMinutesInit * 60);
            const oldMinutesFinish = Number(oldFinish.slice(0,2));
            const oldSecondsFinish = Number(oldFinish.slice(3)) + (oldMinutesFinish * 60);
            
            //Verificamos que los lapsos no se crucen

            if( secondsInit >= oldSecondsInit && secondsInit <= oldSecondsFinish ){
                return {
                    msg: "Not valid init",
                    status: false 
                }
            }

            if( secondsFinish >= oldSecondsInit && secondsFinish <= oldSecondsFinish ){
                return {
                    msg: "Not valid finish",
                    status: false 
                }
            }
            
        }

        //Si llegamos a este return, entonces el lapso es valido
        return{
            msg: "Lapso valido",
            status: true
        }
    }

    //Metodo que devuelve todas las uniones entre episodios y personajes
    async getAll(){
        const result = await this.prisma.character_Episode_Union.findMany({
            include: {
                character: true,
                episode: true
            },
        });
        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que devuelve una union segun el id
    async getOneById(id: number){
    
        const result = await this.prisma.character_Episode_Union.findUnique({ 
            where: { id },
            include: {
                character: true,
                episode: true,
            },
        })

        if(!result) throw new HttpException("Character not found", 404)

        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que crea una union entre episodio y personaje
    async createOne(dto: CreateCharactersEpisodesUnionDto){
        
        try{
            
            //Verificamos que exista el personaje y el episodio

            const character = await this.prisma.character.findUnique({ 
                where: { id: dto.characterId }
            })

            if(!character) throw new NotFoundException("Character not found")

            const episode = await this.prisma.episode.findUnique({ 
                where: { id: dto.episodeId }
            })

            if(!episode) throw new NotFoundException("Episode not found")

            //Verificamos que no exista previamente la union

            const unionExist = await this.prisma.character_Episode_Union.findMany({ 
                where: { 
                    characterId: character.id,
                    episodeId: episode.id 
                }
            })

            if(unionExist){
                
                //Validamos que existe un lapso de participacion valido
                if(dto.init && dto.finish){

                    //Verificamos que el lapso sea unico
                    const exactUnion = await this.prisma.character_Episode_Union.findFirst({
                        where:{
                            characterId: character.id,
                            episodeId: episode.id, 
                            init: dto.init,
                            finish: dto.finish
                        }
                    });

                    if(exactUnion) throw new BadRequestException("Union already exist");
                
                    //Validamos que no se sobreponga el lapso de participacion
                    for(const union of unionExist){
                        
                        const result = this.validateParticipation(dto.init, dto.finish, union.init, union.finish)

                        if(!result.status) throw new BadRequestException(result.msg);
                    }

                }else throw new BadRequestException("Union already exist");
            }else{

                //Validamos que existe un lapso de participacion valido
                if(dto.init && dto.finish){
                    
                    const result = this.validateParticipation(dto.init, dto.finish)

                    if(!result.status) throw new BadRequestException(result.msg);
                }
            }


            //Creamos la union
            const result = await this.prisma.character_Episode_Union.create({
                data:{
                    characterId: dto.characterId,
                    episodeId: dto.episodeId,
                    init: dto?.init,
                    finish: dto?.finish
                }
            });
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

    //Metodo que actualiza la participacion de un registro
    async updateParticipation(id:number, dto: UpdateCharactersEpisodesUnionDto){
        
        try{

            const unionExist = await this.prisma.character_Episode_Union.findUnique({ 
                where: { 
                    id: id
                }
            })

            if(!unionExist) throw new NotFoundException("Union not found");

            const validation = this.validateParticipation(dto.init, dto.finish, unionExist.init, unionExist.finish);

            if(!validation.status) throw new BadRequestException("Not valid participation");

            const result = await this.prisma.character_Episode_Union.update({
                where:{
                    id: id
                },
                data:{
                    init: dto.init,
                    finish: dto.finish
                }
            })
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        }

    }

    //Metodo que migra los datos de union de la Api externa
    async migrateUnion(data: CreateApiEpisodeDto){

        try{
            
            //Obtenemos los id de los personajes en el episodio
            for(const character of data.characters){

                const characterId = character.replace("https://rickandmortyapi.com/api/character/","")

                //Creamos el dto de la union
                const unionDto: CreateCharactersEpisodesUnionDto = new CreateCharactersEpisodesUnionDto(Number(characterId), data.id);
                
                //Guardamos la union
                await this.prisma.character_Episode_Union.create({
                    data:{
                        characterId: unionDto.characterId,
                        episodeId: unionDto.episodeId
                    }
                });
            }

            return {
                msg: 'Peticion correcta'
            }

        }catch(error: any){
            console.log(error.message)
        }

        
    }

    //Metodo que elimina una union
    async deleteOne(id: number){

        try{

            return await this.prisma.character_Episode_Union.delete({ where:{id} })

        }catch(error: any){
            console.log(error.message)
        }  
    }
    
    //Metodo que elimina un personaje de un episodio
    async deleteCharacterFromEpisode(dto: DeleteCharactersEpisodesUnionDto){

        try{

            const unionExist = await this.prisma.character_Episode_Union.findMany({ 
                include:{
                    character: true,
                    episode: true
                },
                where:{
                    character:{
                        is:{
                            id: dto.characterId
                        }
                    },
                    episode:{
                        is:{
                            id: dto.episodeId
                        }
                    }
                }
            })

            if(!unionExist) throw new HttpException("Union not found", 404)


            for(const element of unionExist){
                await this.deleteOne(element.id)
            }
             

            return {
                msg: 'Peticion correcta',
                data: unionExist,
            };

        }catch(error: any){
            console.log(error.message)
        }  
    }

    //Metodo que filtra por los status de los personajes y episodios
    async filterByStatus(statusName: string){
        
        try{

            const statusExist = await this.prisma.status.findMany({
                where:{
                    status: statusName
                }
            })

            if(!statusExist) throw new HttpException("Status not found", 404);

            const result = await this.prisma.character_Episode_Union.findMany({
                include:{
                    character: true,
                    episode: true
                },
                where:{
                    character:{
                        is: {
                            status:{
                                is:{
                                    status: statusName
                                }
                            }
                        }
                    },
                    episode:{
                        is:{
                            status:{
                                is:{
                                    status:statusName
                                }
                            }
                        }
                    }
                }
            })

            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 

    }

    //Metodo que filtra por los status de los personajes y episodios
    async filterCharacterBySeason(seasonName: string){
    
        try{

            const statusExist = await this.prisma.subcategory.findMany({
                where:{
                    subcategory: seasonName
                }
            })

            if(!statusExist) throw new HttpException("Status not found", 404);

            const result = await this.prisma.character_Episode_Union.findMany({
                include:{
                    character: true,
                },
                where:{
                    episode:{
                        is:{
                            subcategory:{
                                is:{
                                    subcategory:seasonName
                                }
                            }
                        }
                    }
                }
            })

            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 

    }

}
