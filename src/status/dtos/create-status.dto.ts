/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateStatusDto{
    
    constructor(
        status: string,
        typeId: number,
    ){
        this.status = status;
        this.typeId = typeId
    }

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    typeId: number;
}