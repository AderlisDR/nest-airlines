import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AirlineAirportDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  city: string;

  @ApiProperty()
  @Expose()
  state: string;
}
