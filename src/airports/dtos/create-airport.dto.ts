import { IsString, Length } from 'class-validator';

export class CreateAirportDto {
  @IsString()
  @Length(5, 100)
  name: string;

  @IsString()
  @Length(5, 100)
  city: string;

  @IsString()
  @Length(5, 100)
  state: string;
}
