import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AirlineAirportDto } from '../../airlines/dtos/airline-airport.dto';

export class FlightAirlineDto {
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
}
