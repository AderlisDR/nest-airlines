import { Expose } from 'class-transformer';
import { FlightDto } from '../../flights/dtos/flight.dto';

export class AirlineDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  flights: FlightDto[];
}
