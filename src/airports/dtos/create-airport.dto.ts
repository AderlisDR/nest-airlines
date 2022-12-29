import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateAirportDto {
  @ApiProperty()
  @IsString()
  @Length(5, 100)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  city: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  state: string;
}
