import { Expose, Transform } from 'class-transformer';
import { AirlineDto } from '../../airlines/dtos/airline.dto';

export class FlightDto {
  @Expose()
  id: string;

  @Transform(({ obj }) => parseInt(obj.flightNumber))
  @Expose()
  number: number;

  @Expose()
  source: string;

  @Expose()
  destination: string;

  @Expose()
  departurDateTime: Date;

  @Expose()
  arrivalDateTime: Date;

  @Transform(({ obj }) => obj.airline.id)
  @Expose()
  airlineId: string;
}
