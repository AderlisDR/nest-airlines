import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AirlineFlightDto } from '../../airlines/dtos/airline-flight.dto';

export class AirportAirlineDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ type: () => [AirlineFlightDto] })
  @Expose()
  @Type(() => AirlineFlightDto)
  flights: AirlineFlightDto[];
}
