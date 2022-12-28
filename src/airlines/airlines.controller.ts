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
import { AirlinesService } from './airlines.service';
import { AirlineDto } from './dtos/airline.dto';
import { CreateAirlineDto } from './dtos/create-airline.dto';
import { UpdateAirlineDto } from './dtos/update-airline.dto';

@Controller('airlines')
@Serialize(AirlineDto)
export class AirlinesController {
  constructor(private airlineService: AirlinesService) {}

  @Post()
  create(@Body() body: CreateAirlineDto) {
    return this.airlineService.create(body);
  }

  @Get()
  getAll() {
    return this.airlineService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.airlineService.getById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateAirlineDto) {
    return this.airlineService.update(id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.airlineService.remove(id);
  }
}
