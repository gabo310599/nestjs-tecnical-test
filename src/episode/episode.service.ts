/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';

@Injectable()
export class EpisodeService {

    constructor(
        private readonly prisma: PrismaService,
    ){}

    //Metodo que devuelve si un episodio esta activo
    async getActive(id: number){

        const result = await this.prisma.episode.findUnique({ 
            where: { id },
            include: {
                status: true,
            },
        })

        return (result && result.status.status === "ACTIVE");

    }

    //Metodo que devuelve todos los episodios
    async getAll(){
        const result = await this.prisma.episode.findMany({
            include: {
                status: true,
                character_episode_union: true,
                subcategory: true,
            },
        });
        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que devuelve un episodio segun el id
    async getOneById(id: number){
        
        const result = await this.prisma.episode.findUnique({ 
            where: { id },
            include: {
                status: true,
                character_episode_union: true,
                subcategory: true,
            },
        })

        if(!result) throw new HttpException("Episode not found", 404)

        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que crea un episodio
    async createOne(dto: CreateEpisodeDto){

        try{

            if(dto.name){           

                const findCharacter = await this.prisma.episode.findFirst({ 
                    where: { name: dto.name, subcategoryId: dto.subcategoryId } 
                });
                
                if(findCharacter) throw new HttpException("Episode name already exists in this season", 400)
                
            }
            
            const result = await this.prisma.episode.create({
                data: {
                    name: dto.name,
                    init: dto.init,
                    finish: dto.finish,
                    statusId: dto.statusId,
                    subcategoryId: dto.subcategoryId,
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

    //Metodo que actualiza un episodio
    async updateOne(id: number, dto: UpdateEpisodeDto){

        try{
            const episodeExist = await this.prisma.episode.findUnique({ where: { id }});

            if(!episodeExist) throw new HttpException("Episode not found", 404);

            if(dto.name){           

                const findCharacter = await this.prisma.episode.findFirst({ 
                    where: { name: dto.name, subcategoryId: dto.subcategoryId } 
                });
                
                if(findCharacter) throw new HttpException("Episode name already exists in this season", 400)
                
            }

            const result = await this.prisma.episode.update({ 
                where: {id}, 
                data:{
                    name: dto.name
                },
            });
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

    //Metodo que desactiva un episodio
    async deleteOne(id: number){
        
        try{

            const episodeExist = await this.prisma.episode.findUnique({ where: { id }});

            if(!episodeExist) throw new HttpException("Episode not found", 404);

            const statusExist = await this.prisma.status.findFirst({ 
                where: {
                    status: 'CANCELLED'
                }
            })

            if(!statusExist) throw new HttpException("Status not found", 404);

            const result = await this.prisma.episode.update({ 
                where: {id},
                data: {
                    statusId: statusExist.id
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

    //Metodo que carga los datos de migracion de la API a la tabla episodios
    async migrateEpisodes(data: [JSON]){
        console.log(data);
        return;
    }
    
}
