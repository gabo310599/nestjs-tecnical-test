/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharactersEpisodesUnionDto } from './dto/create-characters-episodes-union.dto';
import { CreateApiEpisodeDto } from '../episode/dtos/create-api-episode.dto';
import { DeleteCharactersEpisodesUnionDto } from './dto/delete-characters-episodes-union.dto';

@Injectable()
export class CharactersEpisodesUnionService {

    constructor(
        private readonly prisma: PrismaService,
    ){}

    //Metodo que verifica que dos segmentos de participacion no coincidan
    validateParticipation(){
        return
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
    async createOne(data: CreateCharactersEpisodesUnionDto){
        
        try{
            
            //Verificamos que exista el personaje y el episodio

            const character = await this.prisma.character.findUnique({ 
                where: { id: data.characterId }
            })

            if(!character) throw new HttpException("Character not found", 404)

            const episode = await this.prisma.episode.findUnique({ 
                where: { id: data.episodeId }
            })

            if(!episode) throw new HttpException("Episode not found", 404)

            //Verificamos que no exista previamente la union

            const unionExist = await this.prisma.character_Episode_Union.findMany({ 
                where: { 
                    characterId: character.id,
                    episodeId: episode.id 
                }
            })

            if(unionExist && data.init && data.finish){
                
                //Validamos si la participacion no se solapa

            }else
                if(unionExist) throw new HttpException("Union already exist", 400)


            //Creamos la union

            const result = await this.prisma.character_Episode_Union.create({ data });
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

}
