/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryTypeService {

    constructor(private readonly prisma: PrismaService){}

    //Metodo que devuelve todos los tipos de categorias
    async getAll(){
        const result = await this.prisma.category_Type.findMany({
            include: {
                subcategory: true,
            },
        });
        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que devuelve un tipo de categoria segun el id
    async getOneById(id: number){
        
        const result = await this.prisma.category_Type.findUnique({ 
            where: { id },
            include: {
                subcategory: true,
            },
        })

        if(!result) throw new HttpException("Category type not found", 404)

        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que crea un tipo de categoria
    async createOne(data: Prisma.Category_TypeCreateInput){
    
        try{

            if(data.type_name){           
                
                const findCategoryType = await this.prisma.category_Type.findFirst({ 
                    where: { type_name: data.type_name as string} 
                });
                
                if(findCategoryType) throw new HttpException("Category type already exists", 400)
                
            }
            
            const result = await this.prisma.category_Type.create({ data });
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

    //Metodo que actualiza un tipo de categoria
    async updateOne(id: number, data: Prisma.Category_TypeUpdateInput){

        try{
            const categoryTypeExist = await this.prisma.category_Type.findUnique({ where: { id }})

            if(!categoryTypeExist) throw new HttpException("Category type not found", 404)

            if(data.type_name){           
                
                const findCategoryType = await this.prisma.category_Type.findFirst({ 
                    where: { type_name: data.type_name as string} 
                });
                
                if(findCategoryType) throw new HttpException("Category type already exists", 400)
                
            }

            const result = await this.prisma.category_Type.update({ where: {id}, data});
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

    //Metodo que elimina un tipo de categoria
    async deleteOne(id: number){
        
        try{

            const categoryTypeExist = await this.prisma.category_Type.findUnique({ where: { id }})

            if(!categoryTypeExist) throw new HttpException("Category type not found", 404)

            const result = await this.prisma.category_Type.delete({ where: {id}});
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }
}
