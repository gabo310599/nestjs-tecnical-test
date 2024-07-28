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
    @IsOptional()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    typeId: number;
}