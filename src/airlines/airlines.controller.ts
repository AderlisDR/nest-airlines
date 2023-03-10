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
import { AirlinesService } from './airlines.service';
import { AirlineDto } from './dtos/airline.dto';
import { CreateAirlineDto } from './dtos/create-airline.dto';
import { UpdateAirlineDto } from './dtos/update-airline.dto';

@ApiTags('Airlines')
@Controller('airlines')
@Serialize(AirlineDto)
export class AirlinesController {
  constructor(private airlineService: AirlinesService) {}

  @Post()
  @ApiCreatedResponse({ type: AirlineDto })
  create(@Body() body: CreateAirlineDto) {
    return this.airlineService.create(body);
  }

  @Get()
  @ApiOkResponse({ type: [AirlineDto] })
  getAll() {
    return this.airlineService.getAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: AirlineDto })
  getById(@Param('id') id: string) {
    return this.airlineService.getById(id);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: AirlineDto })
  @ApiNotFoundResponse({ type: NotFoundException })
  update(@Param('id') id: string, @Body() body: UpdateAirlineDto) {
    return this.airlineService.update(id, body);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: AirlineDto })
  @ApiNotFoundResponse({ type: NotFoundException })
  remove(@Param('id') id: string) {
    return this.airlineService.remove(id);
  }
}
