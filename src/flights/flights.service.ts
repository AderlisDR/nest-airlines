import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirlinesService } from '../airlines/airlines.service';
import { Flight } from '../entities/flight.entity';
import { CreateFlightDto } from './dtos/create-flight.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight) private flightRepo: Repository<Flight>,
    private airlinesService: AirlinesService,
  ) {}

  async create(flightDto: CreateFlightDto) {
    const flight = this.flightRepo.create({
      flightNumber: flightDto.number,
      ...flightDto,
    });
    const airline = await this.airlinesService.getById(flightDto.airlineId);

    if (!airline) {
      throw new NotFoundException('Specified airline not found');
    }

    if (!airline.isActive) {
      throw new BadRequestException(`${airline.name} is not active`);
    }

    if (airline.isArchived) {
      throw new BadRequestException(`${airline.name} is archived`);
    }

    const airlineFlight = airline.flights.find(
      (value: Flight) => value.flightNumber === flight.flightNumber,
    );

    if (airlineFlight) {
      throw new BadRequestException(
        `Flight ${flight.flightNumber} already regustered for ${airline.name}`,
      );
    }

    flight.airline = airline;

    await this.flightRepo.save(flight);

    return flight;
  }
}
