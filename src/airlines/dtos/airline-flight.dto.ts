import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class AirlineFlightDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.flightNumber)
  @Expose()
  number: string;

  @ApiProperty()
  @Expose()
  source: string;

  @ApiProperty()
  @Expose()
  destination: string;

  @ApiProperty()
  @Expose()
  departurDateTime: Date;

  @ApiProperty()
  @Expose()
  arrivalDateTime: Date;
}
