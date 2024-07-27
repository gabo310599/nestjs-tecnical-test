/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator'

export class UpdateCategoryTypeDto{

    constructor(
        type_name: string,
    ){
        this.type_name = type_name;
    }
    
    @IsString()
    @IsNotEmpty()
    type_name: string;
}