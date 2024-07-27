/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class UpdateStatusDto{
    
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
    @IsOptional()f
    typeId: number;
}