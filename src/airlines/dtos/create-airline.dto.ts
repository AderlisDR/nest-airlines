import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateAirlineDto {
  @ApiProperty()
  @IsString()
  @Length(5, 100)
  name: string;

  @ApiProperty()
  @IsUUID()
  airportId: string;
}
