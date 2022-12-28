import { Expose, Type } from 'class-transformer';
import { AirlineDto } from '../../airlines/dtos/airline.dto';

export class AirportDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  state: string;

  @Expose()
  @Type(() => AirlineDto)
  airlines: AirlineDto[];
}
