import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { FlightDto } from './dtos/flight.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import { FlightsService } from './flights.service';

@Controller('flights')
@Serialize(FlightDto)
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Post()
  create(@Body() body: CreateFlightDto) {
    return this.flightsService.create(body);
  }

  @Get()
  getAll() {
    return this.flightsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.flightsService.getById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateFlightDto) {
    return this.flightsService.update(id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.flightsService.remove(id);
  }
}
