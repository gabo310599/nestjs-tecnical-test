/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator'

export class CreateApiEpisodeDto{
    
    constructor(
        id: number,
        name: string,
        air_date: string,
        episode: string,
        characters: string[],
        url: string,
        created: string,
    ){
        this.id = id;
        this.name = name;
        this.air_date = air_date;
        this.episode = episode;
        this.characters = characters;
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
    air_date: string;

    @IsString()
    @IsOptional()
    episode: string;

    @IsArray()
    @IsString()
    @IsOptional()
    characters: string[];

    @IsString()
    @IsOptional()
    url: string;

    @IsString()
    @IsOptional()
    created: string;

}