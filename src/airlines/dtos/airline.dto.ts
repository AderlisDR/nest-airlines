import { Expose, Type } from 'class-transformer';
import { AirportDto } from '../../airports/dtos/airport.dto';
import { FlightDto } from '../../flights/dtos/flight.dto';

export class AirlineDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => AirportDto)
  airports: AirportDto[];

  @Expose()
  @Type(() => FlightDto)
  flights: FlightDto[];
}
