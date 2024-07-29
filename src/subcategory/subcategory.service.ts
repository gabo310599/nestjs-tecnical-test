/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubcategoryService {

    constructor(private readonly prisma: PrismaService){}

    //Metodo que devuelve todas las subcategorias
    async getAll(){
        const result = await this.prisma.subcategory.findMany({
            include: {
                category: true,
                character: true,
                episode: true,
            },
        });
        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que devuelve una subcategoria segun el id
    async getOneById(id: number){
        
        const result = await this.prisma.subcategory.findUnique({ 
            where: { id },
            include: {
                category: true,
            },
        })

        if(!result) throw new HttpException("Subcategory not found", 404)

        return {
            msg: 'Peticion correcta',
            data: result,
        };
    }

    //Metodo que crea una subcategoria
    async createOne(categoryId: number, data: Prisma.SubcategoryCreateWithoutCategoryInput){
    
        try{

            if(data.subcategory){           
                
                const findSubcategory = await this.prisma.subcategory.findFirst({ 
                    where: { subcategory: data.subcategory as string, categoryId: categoryId} 
                });
                
                if(findSubcategory) throw new HttpException("Subcategory already exists", 400)
                
            }
            
            const result = await this.prisma.subcategory.create({ 
                data: {
                    ...data,
                    categoryId,
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

    //Metodo que actualiza una subcategoria
    async updateOne(id: number, data: Prisma.SubcategoryUpdateWithoutCategoryInput){

        try{
            const subcategoryExist = await this.prisma.subcategory.findUnique({ where: { id }});

            if(!subcategoryExist) throw new HttpException("Subcategory not found", 404)

            if(data.subcategory){           
                
                const findSubcategory = await this.prisma.subcategory.findFirst({ 
                    where: { subcategory: data.subcategory as string} 
                });
                
                if(findSubcategory) throw new HttpException("Subcategory already exists", 400)
                
            }

            const result = await this.prisma.subcategory.update({ where: {id}, data});
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

            const subcategoryExist = await this.prisma.subcategory.findUnique({ where: { id }})

            if(!subcategoryExist) throw new HttpException("Subcategory not found", 404)

            const result = await this.prisma.subcategory.delete({ where: {id}});
            return {
                msg: 'Peticion correcta',
                data: result,
            };

        }catch(error: any){
            console.log(error.message)
        } 
    }

    //Metodo que retorna el id del status solicitado
    async getSubcategoryId(category: string, subcategory: string){
        
        const type = await this.prisma.category_Type.findFirst({
            where:{
                type_name: category
            }
        })

        if(!type) throw new HttpException("Category type not found", 404);
        
        const result = await this.prisma.subcategory.findFirst({ 
            where: { 
                subcategory: subcategory,
                categoryId: type.id    
            }
        })

        if(!result){
            return null;
        }

        return result.id;
    }

    //Metodo que crea una subcategoria durante la migracion de datos de la Api externa
    async createSubcategory(category: string, subcategory: string){

        const type = await this.prisma.category_Type.findFirst({
            where:{
                type_name: category
            }
        })

        if(!type) throw new HttpException("Category type not found", 404);

        try{

            const result = await this.prisma.subcategory.create({ 
                data:{
                    subcategory: subcategory,
                    categoryId: type.id
                }
            })

            return result.id;

        }catch(error: any){
            console.log(error.message)
        } 

    }
}
