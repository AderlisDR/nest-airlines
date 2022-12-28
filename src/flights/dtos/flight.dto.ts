import { Expose, Transform, Type } from 'class-transformer';
import { AirlineDto } from '../../airlines/dtos/airline.dto';

export class FlightDto {
  @Expose()
  id: string;

  @Transform(({ obj }) => obj.flightNumber)
  @Expose()
  number: string;

  @Expose()
  source: string;

  @Expose()
  destination: string;

  @Expose()
  departurDateTime: Date;

  @Expose()
  arrivalDateTime: Date;

  @Expose()
  @Type(() => AirlineDto)
  airline: AirlineDto;
}
