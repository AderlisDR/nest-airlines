import { IsString, IsUUID, Length } from 'class-validator';

export class CreateAirlineDto {
  @IsString()
  @Length(5, 100)
  name: string;

  @IsUUID()
  airportId: string;
}
