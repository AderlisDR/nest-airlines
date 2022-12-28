import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Airport } from '../entities/airport.entity';
import { Repository } from 'typeorm';
import { Airline } from '../entities/airline.entity';
import { CreateAirportDto } from './dtos/create-airport.dto';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(Airport) private airportRepo: Repository<Airport>,
  ) {}

  create(airportDto: CreateAirportDto) {
    const airport = this.airportRepo.create(airportDto);

    return this.airportRepo.save(airport);
  }

  getById(id: string) {
    if (!id) {
      return null;
    }

    return this.airportRepo.findOne({ where: { id }, relations: ['airlines'] });
  }

  addAirlineToAirport(airport: Airport, airline: Airline) {
    airport.airlines.push(airline);

    return this.airportRepo.save(airport);
  }
}
