import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AirportAirlineDto } from './airport-airline.dto';

export class AirportDto {
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

  @ApiProperty({ type: () => [AirportAirlineDto] })
  @Expose()
  @Type(() => AirportAirlineDto)
  airlines: AirportAirlineDto[];
}
