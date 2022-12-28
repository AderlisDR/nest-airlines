import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airline } from '../entities/airline.entity';
import { Airport } from '../entities/airport.entity';
import { CreateAirportDto } from './dtos/create-airport.dto';

@Injectable()
export class AirportsService {
  private includes = [
    'airlines',
    'airlines.flights',
    'airlines.flights.airline',
  ];

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

    return this.airportRepo.findOne({
      where: { id },
      relations: this.includes,
    });
  }

  addAirlineToAirport(airport: Airport, airline: Airline) {
    airport.airlines.push(airline);

    return this.airportRepo.save(airport);
  }

  getAll() {
    return this.airportRepo.find({
      where: { isActive: true, isArchived: false },
      relations: this.includes,
    });
  }

  async update(id: string, attrs: Partial<Airport>) {
    const airport = await this.getById(id);

    if (!airport) {
      throw new NotFoundException(`Airport with id ${id} not found`);
    }

    Object.assign(airport, attrs);

    return this.airportRepo.save(airport);
  }

  async remove(id: string) {
    const airport = await this.getById(id);

    if (!airport) {
      throw new NotFoundException(`Airport with id ${id} not found`);
    }

    return this.airportRepo.remove(airport);
  }
}
