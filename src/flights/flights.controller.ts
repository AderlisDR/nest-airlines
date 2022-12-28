import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { FlightDto } from './dtos/flight.dto';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Post()
  @Serialize(FlightDto)
  create(@Body() body: CreateFlightDto) {
    return this.flightsService.create(body);
  }
}
