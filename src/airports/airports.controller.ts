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
import { AirportsService } from './airports.service';
import { AirportDto } from './dtos/airport.dto';
import { CreateAirportDto } from './dtos/create-airport.dto';
import { UpdateAirportDto } from './dtos/update-airport.dto';

@ApiTags('Airports')
@Controller('airports')
@Serialize(AirportDto)
export class AirportsController {
  constructor(private airportsService: AirportsService) {}

  @Post()
  @ApiCreatedResponse({ type: AirportDto })
  create(@Body() body: CreateAirportDto) {
    return this.airportsService.create(body);
  }

  @Get()
  @ApiOkResponse({ type: [AirportDto] })
  getAll() {
    return this.airportsService.getAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: AirportDto })
  getById(@Param('id') id: string) {
    return this.airportsService.getById(id);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: AirportDto })
  @ApiNotFoundResponse({ type: NotFoundException })
  update(@Param('id') id: string, @Body() body: UpdateAirportDto) {
    return this.airportsService.update(id, body);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: AirportDto })
  @ApiNotFoundResponse({ type: NotFoundException })
  remove(@Param('id') id: string) {
    return this.airportsService.remove(id);
  }
}
