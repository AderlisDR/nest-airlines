import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAirportDto {
  @IsString()
  @Length(5, 100)
  @IsOptional()
  name: string;

  @IsString()
  @Length(5, 100)
  @IsOptional()
  city: string;

  @IsString()
  @Length(5, 100)
  @IsOptional()
  state: string;
}
