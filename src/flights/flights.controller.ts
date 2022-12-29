import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { FlightDto } from './dtos/flight.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import { FlightsService } from './flights.service';

@ApiTags('Flights')
@Controller('flights')
@Serialize(FlightDto)
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Post()
  @ApiCreatedResponse({ type: FlightDto })
  create(@Body() body: CreateFlightDto) {
    return this.flightsService.create(body);
  }

  @Get()
  @ApiOkResponse({ type: [FlightDto] })
  getAll() {
    return this.flightsService.getAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: FlightDto })
  getById(@Param('id') id: string) {
    return this.flightsService.getById(id);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: FlightDto })
  @ApiNotFoundResponse({ type: NotFoundException })
  update(@Param('id') id: string, @Body() body: UpdateFlightDto) {
    return this.flightsService.update(id, body);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: FlightDto })
  @ApiNotFoundResponse({ type: NotFoundException })
  remove(@Param('id') id: string) {
    return this.flightsService.remove(id);
  }
}
