import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirportsService } from '../airports/airports.service';
import { Airline } from '../entities/airline.entity';
import { Flight } from '../entities/flight.entity';
import { CreateAirlineDto } from './dtos/create-airline.dto';

@Injectable()
export class AirlinesService {
  constructor(
    @InjectRepository(Airline) private airlineRepo: Repository<Airline>,
    private airportsService: AirportsService,
  ) {}

  async create(airlineDto: CreateAirlineDto) {
    const airline = this.airlineRepo.create(airlineDto);
    const airport = await this.airportsService.getById(airlineDto.airportId);

    if (!airport) {
      throw new NotFoundException('Specified airport not found');
    }

    if (!airport.isActive) {
      throw new BadRequestException(`${airport.name} is not active`);
    }

    if (airport.isArchived) {
      throw new BadRequestException(`${airport.name} is archived`);
    }

    await this.airlineRepo.save(airline);
    await this.airportsService.addAirlineToAirport(airport, airline);

    return airline;
  }

  getById(id: string) {
    if (!id) {
      return null;
    }

    return this.airlineRepo.findOne({ where: { id }, relations: ['flights'] });
  }
}
