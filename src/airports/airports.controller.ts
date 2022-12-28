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
import { AirportsService } from './airports.service';
import { AirportDto } from './dtos/airport.dto';
import { CreateAirportDto } from './dtos/create-airport.dto';
import { UpdateAirportDto } from './dtos/update-airport.dto';

@Controller('airports')
@Serialize(AirportDto)
export class AirportsController {
  constructor(private airportsService: AirportsService) {}

  @Post()
  create(@Body() body: CreateAirportDto) {
    return this.airportsService.create(body);
  }

  @Get()
  getAll() {
    return this.airportsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.airportsService.getById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateAirportDto) {
    return this.airportsService.update(id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.airportsService.remove(id);
  }
}
