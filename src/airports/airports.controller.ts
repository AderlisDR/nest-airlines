import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AirportsService } from './airports.service';
import { AirportDto } from './dtos/airport.dto';
import { CreateAirportDto } from './dtos/create-airport.dto';

@Controller('airports')
export class AirportsController {
  constructor(private airportsService: AirportsService) {}

  @Post()
  @Serialize(AirportDto)
  create(@Body() body: CreateAirportDto) {
    return this.airportsService.create(body);
  }
}
