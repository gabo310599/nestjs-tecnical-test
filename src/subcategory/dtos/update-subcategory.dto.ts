/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class UpdateSubcategoryDto{
    
    constructor(
        subcategory: string,
        categoryId: number,
    ){
        this.subcategory = subcategory;
        this.categoryId = categoryId
    }

    @IsString()
    @IsNotEmpty()
    subcategory: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    categoryId: number;
}