/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharacterDto } from './dtos/create-character.dto';
import { UpdateCharacterDto } from './dtos/update-character.dto';
import { StatusService } from '../status/status.service';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { CreateApiCharacterDto } from './dtos/create-api-character.dto';

@Injectable()
export class CharacterService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly statusService: StatusService,
        private readonly subcategoryService: SubcategoryService
    ){}

    //Metodo que devuelve si un personaje esta activo
    async getActive(id: number){

        const result = await this.prisma.character.findUnique({ 
            where: { id },
            include: {
                status: true,
            }, 
        });

        return (result && result.status.status === "ACTIVE");

    }

    //Metodo que devuelve todos los personajes
    async getAll(){
        const result = await this.prisma.character.findMany();
        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que devuelve un personaje segun el id
    async getOneById(id: number){
        
        const result = await this.prisma.character.findUnique({ 
            where: { id },
            include: {
                status: true,
                character_episode_union: true,
                subcategory: true,
            },
        })

        if(!result) throw new HttpException("Character not found", 404)

        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que crea un personaje
    async createOne(dto: CreateCharacterDto){

        try{

            if(dto.name){           

                const findCharacter = await this.prisma.character.findFirst({ 
                    where: { name: dto.name, subcategoryId: dto.subcategoryId } 
                });
                
                if(findCharacter) throw new HttpException("Character name already exists in that specie and type", 400)
                
            }
            
            const result = await this.prisma.character.create({
                data: {
                    name: dto.name,
                    statusId: dto.statusId,
                    subcategoryId: dto.subcategoryId,
                    gender: dto.gender
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

    //Metodo que actualiza un personaje
    async updateOne(id: number, dto: UpdateCharacterDto){

        try{
            const characterExist = await this.prisma.character.findUnique({ where: { id }});

            if(!characterExist) throw new HttpException("Character not found", 404);
           
                
            const findCharacter = await this.prisma.character.findFirst({ 
                where: { name: dto.validationName, subcategoryId: dto.validationType} 
            });
            
            if(!findCharacter) throw new HttpException("Character update denied because of failed validation", 400)
            
            if(dto.name){           

                const findCharacterName = await this.prisma.character.findFirst({ 
                    where: { name: dto.name, subcategoryId: dto.subcategoryId } 
                });
                
                if(findCharacterName) throw new HttpException("Character name already exists in that specie and type", 400)
                
            }

            const result = await this.prisma.character.update({ 
                where: {id}, 
                data:{
                    name: dto.name,
                    subcategoryId: dto?.subcategoryId,
                    statusId: dto?.statusId,
                    gender: dto?.gender,
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

    //Metodo que desactiva un personaje
    async deleteOne(id: number){
        
        try{

            const characterExist = await this.prisma.character.findUnique({ where: { id }});

            if(!characterExist) throw new HttpException("Character not found", 404);

            const statusExist = await this.prisma.status.findFirst({ 
                where: {
                    status: 'SUSPENDED'
                }
            })

            if(!statusExist) throw new HttpException("Status not found", 404);

            const result = await this.prisma.character.update({ 
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

    //Metodo que carga los datos de migracion de la API a la tabla personajes
    async migrateCharacters(dto: CreateApiCharacterDto[]){

        //Creamos el arreglo de dto que migrara los datos extraidos de la Api externa
        let characterDto: CreateCharacterDto;
        const charactersList: CreateCharacterDto[] = [];
        

        //Recorremos el dto Api externa para transformarlo en el dto que maneja la aplicacion
        for(const element of dto){

            //Ubicamos el id del status activo de episodios
            let statusId;
            
            if(element.status === 'Alive'){
                statusId = await this.statusService.getStatusId("CHARACTERS", "ACTIVE");
            }else{
                statusId = await this.statusService.getStatusId("CHARACTERS", "SUSPENDED");
            }

            //Ubicamos el id de la subcategoria (species)
            let subcategoryId = await this.subcategoryService.getSubcategoryId("SPECIES", element.species);


            //Si no exista la subcategoria, se crea y obtenemos el id
            if(!subcategoryId){
                subcategoryId = await this.subcategoryService.createSubcategory("SPECIES", element.species);
            }

            //Creamos el dto y lo agregamos a la lista
            characterDto = new CreateCharacterDto(
                element.name,
                subcategoryId,
                statusId,
                element.gender,
            );
            charactersList.push(characterDto); 

        }

        //Creamos los registros de episodios en la base de datos
        try{
                    
            const result = await this.prisma.character.createMany({
                data: charactersList
            });

            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

    //Metodo que regresa todos los personajes de una especie
    async getBySpecies(speciesName: string){

        const result = await this.prisma.character.findMany({
            include: {
                subcategory: true,
            },
            where:{
                subcategory:{
                    is:{
                        subcategory: speciesName
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
