import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AirlineAirportDto } from './airline-airport.dto';
import { AirlineFlightDto } from './airline-flight.dto';

export class AirlineDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ type: () => [AirlineAirportDto] })
  @Expose()
  @Type(() => AirlineAirportDto)
  airports: AirlineAirportDto[];

  @ApiProperty({ type: () => [AirlineFlightDto] })
  @Expose()
  @Type(() => AirlineFlightDto)
  flights: AirlineFlightDto[];
}
