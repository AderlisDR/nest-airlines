import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { FlightAirlineDto } from './flight-airline.dto';

export class FlightDto {
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

  @ApiProperty({ type: () => FlightAirlineDto })
  @Expose()
  @Type(() => FlightAirlineDto)
  airline: FlightAirlineDto;
}
