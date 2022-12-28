import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AirlinesService } from './airlines.service';
import { AirlineDto } from './dtos/airline.dto';
import { CreateAirlineDto } from './dtos/create-airline.dto';

@Controller('airlines')
export class AirlinesController {
  constructor(private airlineService: AirlinesService) {}

  @Post()
  @Serialize(AirlineDto)
  create(@Body() body: CreateAirlineDto) {
    return this.airlineService.create(body);
  }
}
