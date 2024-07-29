/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharactersEpisodesUnionDto } from './dto/create-characters-episodes-union.dto'

@Injectable()
export class CharactersEpisodesUnionService {

    constructor(private readonly prisma: PrismaService){}

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

    //Metodo que devuelve una union entre episodio y personaje segun el id
    async getOneById(id: number){
        
        const result = await this.prisma.character_Episode_Union.findUnique({ 
            where: { id },
            include: {
                character: true,
                episode: true
            },
        })

        if(!result) throw new HttpException("Union not found", 404)

        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que crea una union entre episodio y personaje
    async createOne(characterId: number, episodeId: number, data: CreateCharactersEpisodesUnionDto){
        
        try{
            
            //Verificamos que exista el personaje y el episodio

            const character = await this.prisma.character.findUnique({ 
                where: { id: characterId }
            })

            if(!character) throw new HttpException("Character not found", 404)

            const episode = await this.prisma.episode.findUnique({ 
                where: { id: episodeId }
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

    //Metodo que elimina una union entre episodio y personaje
    async deleteOne(id: number){
        
        try{

            const unionExist = await this.prisma.character_Episode_Union.findUnique({ where: { id }})

            if(!unionExist) throw new HttpException("Union not found", 404)

            const result = await this.prisma.character_Episode_Union.delete({ where: {id}});
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }
    
}
