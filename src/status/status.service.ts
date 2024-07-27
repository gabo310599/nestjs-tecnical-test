/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StatusService {

    constructor(private readonly prisma: PrismaService){}

    //Metodo que devuelve todos los status
    async getAll(){
        const result = await this.prisma.status.findMany({
            include: {
                type: true,
            },
        });
        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que devuelve un status segun el id
    async getOneById(id: number){
    
        const result = await this.prisma.status.findUnique({ where: { id }})

        if(!result) throw new HttpException("Status not found", 404)

        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que crea un status
    async createOne(typeId: number, data: Prisma.StatusCreateWithoutTypeInput){
    
        try{

            if(data.status){           
                
                const findStatus = await this.prisma.status.findFirst({ 
                    where: { status: data.status as string, typeId: typeId} 
                });

                if(findStatus) throw new HttpException("Status already exists", 400)
                
            }
            
            const result = await this.prisma.status.create({ 
                data: {
                    ...data,
                    typeId,
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

    //Metodo que actualiza un status
    async updateOne(id: number, data: Prisma.StatusUpdateWithoutTypeInput){

        try{
            const statusExist = await this.prisma.status.findUnique({ where: { id }})

            if(!statusExist) throw new HttpException("Status not found", 404)

            if(data.status){           
            
                const findStatus = await this.prisma.status.findFirst({ 
                    where: { status: data.status as string } 
                });

                if(findStatus) throw new HttpException("Status already exists", 400)
                
            }

            const result = await this.prisma.status.update({ where: {id}, data});
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

    //Metodo que elimina un status
    async deleteOne(id: number){
    
        try{

            const statusExist = await this.prisma.status.findUnique({ where: { id }})

            if(!statusExist) throw new HttpException("Status not found", 404)

            const result = await this.prisma.status.delete({ where: {id}});
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }


}
