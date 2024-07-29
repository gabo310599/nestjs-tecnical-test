/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StatusTypeService {

    constructor(private readonly prisma: PrismaService){}

    //Metodo que devuelve todos los tipos de status
    async getAll(){
        const result = await this.prisma.status_Type.findMany({
            include: {
                status: true,
            },
        });
        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que devuelve un tipo de status segun el id
    async getOneById(id: number){
        
        const result = await this.prisma.status_Type.findUnique({ 
            where: { id },
            include: {
                status: true,
            },
        })

        if(!result) throw new HttpException("Status type not found", 404)

        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que crea un tipo de status
    async createOne(data: Prisma.Status_TypeCreateInput){
        
        try{

            if(data.type_name){           
                
                const findStatusType = await this.prisma.status_Type.findFirst({ 
                    where: { type_name: data.type_name as string} 
                });
                
                if(findStatusType) throw new HttpException("Status type already exists", 400)
                
            }
            
            const result = await this.prisma.status_Type.create({ data });
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

    //Metodo que actualiza un tipo de status
    async updateOne(id: number, data: Prisma.Status_TypeUpdateInput){

        try{
            const statusTypeExist = await this.prisma.status_Type.findUnique({ where: { id }})

            if(!statusTypeExist) throw new HttpException("Status type not found", 404)

            if(data.type_name){           
                
                const findStatusType = await this.prisma.status_Type.findFirst({ 
                    where: { type_name: data.type_name as string} 
                });
                
                if(findStatusType) throw new HttpException("Status type already exists", 400)
                
            }

            const result = await this.prisma.status_Type.update({ where: {id}, data});
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

    //Metodo que elimina un tipo de status
    async deleteOne(id: number){
        
        try{

            const statusTypeExist = await this.prisma.status_Type.findUnique({ where: { id }})

            if(!statusTypeExist) throw new HttpException("Status type not found", 404)

            const result = await this.prisma.status_Type.delete({ where: {id}});
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

    //Metodo que carga los datos de migracion de los tipos de status (solo usar una vez)
    async migrateStatusTypes(data: Prisma.Status_TypeCreateManyInput){
        try{
            
            const result = await this.prisma.status_Type.createMany({
                data: data
            });

            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

}
