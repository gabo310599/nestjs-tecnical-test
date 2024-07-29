/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsOptional, IsObject, IsArray } from 'class-validator'

export class CreateApiCharacterDto{
    
    constructor(
        id: number,
        name: string,
        status: string,
        species: string,
        type: string,
        gender: string,
        origin: any,
        location: any,
        image: string,
        episode: string[],
        url: string,
        created: string
    ){
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.type = type;
        this.gender = gender;
        this.origin = origin;
        this.location = location;
        this.image = image;
        this.episode = episode;
        this.url = url;
        this.created = created;
    }

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsString()
    @IsOptional()
    species: string;

    @IsString()
    @IsOptional()
    gender: string;

    @IsString()
    @IsOptional()
    type: string;

    @IsObject()
    @IsOptional()
    origin: any;

    @IsObject()
    @IsOptional()
    location: any;

    @IsString()
    @IsOptional()
    image: string;

    @IsArray()
    @IsString()
    @IsOptional()
    episode: string[];

    @IsString()
    @IsOptional()
    url: string;

    @IsString()
    @IsOptional()
    created: string;
}