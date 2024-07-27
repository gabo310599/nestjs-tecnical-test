/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateSubcategoryDto{
    
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
    categoryId: number;
}