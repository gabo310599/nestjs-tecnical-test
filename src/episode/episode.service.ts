/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { CreateApiEpisodeDto } from './dtos/create-api-episode.dto';
import { StatusService } from '../status/status.service';
import { SubcategoryService } from '../subcategory/subcategory.service';

@Injectable()
export class EpisodeService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly statusService: StatusService,
        private readonly subcategoryService: SubcategoryService,
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
    async getAll(pageNumber: number){

        let offset = 0;
        if(pageNumber)
            offset = (pageNumber - 1) * 5;
        else
            pageNumber = 1

        const result = await this.prisma.episode.findMany({
            skip: offset,
            take: 5,
            orderBy:{ id: "asc"},
            include:{
                subcategory: true,
                status: true,
            }
        });

        const recordCount = await this.prisma.episode.count();

        //Preparamos siguiente/previa pagina 
        let nextPage = null;
        let prevPage = null;

        //Previa
        if(pageNumber > 1 && result.length > 0){
            prevPage = "http://localhost:3000/episode?page="+(pageNumber-1);
        }

        //Siguiente
        if(offset + 5 <  recordCount){
            nextPage = "http://localhost:3000/episode?page="+(pageNumber+1);
        }

        return {
            msg: 'Peticion correcta',
            next: nextPage,
            prev: prevPage,
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

                const findEpisode = await this.prisma.episode.findFirst({ 
                    where: { name: dto.name, subcategoryId: dto.subcategoryId } 
                });
                
                if(findEpisode) throw new HttpException("Episode name already exists in this season", 400)
                
            }

            if(dto.duration){

                //Validamos que no sea mayor a 60 minutos
                const minutes = Number(dto.duration.slice(0,2));
                const seconds = Number(dto.duration.slice(3)) + (minutes * 60);

                if(seconds > 3600) throw new BadRequestException("Not valid duration")

            }
            
            const result = await this.prisma.episode.create({
                data: {
                    name: dto.name,
                    duration: dto.duration,
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
           

            const findEpisode = await this.prisma.episode.findFirst({ 
                where: { name: dto.validationName, subcategoryId: dto.validationSubcategory } 
            });
            
            if(!findEpisode) throw new HttpException("Episode update denied because of failed validation", 400)
            
            if(dto.name){           

                const findEpisodeName = await this.prisma.episode.findFirst({ 
                    where: { name: dto.name, subcategoryId: dto.subcategoryId } 
                });
                
                if(findEpisodeName) throw new HttpException("Episode name already exists in this season", 400)
                
            }

            if(dto.duration){

                //Validamos que no sea mayor a 60 minutos
                const minutes = Number(dto.duration.slice(0,2));
                const seconds = Number(dto.duration.slice(3)) + (minutes * 60);

                if(seconds > 3600) throw new BadRequestException("Not valid duration")
                    
            }

            const result = await this.prisma.episode.update({ 
                where: {id}, 
                data:{
                    name: dto?.name,
                    duration: dto?.duration,
                    statusId: dto?.statusId,
                    subcategoryId: dto?.subcategoryId,
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
    async migrateEpisodes(dto: CreateApiEpisodeDto[]){

        //Ubicamos el id del status activo de episodios 
        //(por defecto, todos los episodios se importaran como activos)
        const statusId = await this.statusService.getStatusId("EPISODES", "ACTIVE");

        //Creamos el arreglo de dto que migrara los datos extraidos de la Api externa
        let episodeDto: CreateEpisodeDto;
        const episodesList: CreateEpisodeDto[] = [];

        //Recorremos el dto Api externa para transformarlo en el dto que maneja la aplicacion
        for(const element of dto){
            
            //Ubicamos el id de la subcategoria (season)
            let subcategoryName = "SEASON ";
            const episodeArray = element.episode.split('E')
            const seasonNumber = episodeArray[0].replace('S','');
            subcategoryName = subcategoryName + seasonNumber;

            let subcategoryId = await this.subcategoryService.getSubcategoryId("SEASON",subcategoryName);


            //Si no exista la subcategoria, se crea y obtenemos el id
            if(!subcategoryId){
                subcategoryId = await this.subcategoryService.createSubcategory("SEASON", subcategoryName);
            }

            //Generamos los segundos y minutos de duracion
            let seconds = Math.floor(Math.random() * 61);
            let minutes = Math.floor(Math.random() * 60);
            if(seconds === 60 ){
                seconds = 0;
                minutes = minutes + 1; 
            }
            if(minutes < 10){
                minutes = minutes + 10;
            }
            
            //Le damos forma a duracion
            let secondsString = "";
            const minutesString = "" + minutes;
            if(seconds < 10){
                secondsString = "0" + seconds;
            }else{
                secondsString = "" + seconds;
            }

            const duration = minutesString + ":" + secondsString;


            //Creamos el dto y lo agregamos a la lista
            episodeDto = new CreateEpisodeDto(
                element.name,
                duration,
                statusId,
                subcategoryId
            );
            episodesList.push(episodeDto);           
        }

        //Creamos los registros de episodios en la base de datos
        try{
            
            const result = await this.prisma.episode.createMany({
                data: episodesList
            });

            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 

    }

    //Metodo que regresa todos los episodios de una temporada
    async getBySpecies(seasonName: string){

        const result = await this.prisma.episode.findMany({
            include: {
                subcategory: true,
            },
            where:{
                subcategory:{
                    is:{
                        subcategory: seasonName
                    }
                }
            }
        });
        
        return{
            msg: 'Peticion correcta',
            data: result
        }
    }
    
}
