import { Expose, Transform } from 'class-transformer';

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

  @Transform(({ obj }) => obj.airline.id)
  @Expose()
  airlineId: string;
}
