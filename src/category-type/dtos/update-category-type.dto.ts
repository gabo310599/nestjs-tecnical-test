/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateCategoryTypeDto{

    constructor(
        type_name: string,
    ){
        this.type_name = type_name;
    }
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    type_name: string;
}