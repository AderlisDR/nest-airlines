import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirportsService } from '../airports/airports.service';
import { Airline } from '../entities/airline.entity';
import { CreateAirlineDto } from './dtos/create-airline.dto';

@Injectable()
export class AirlinesService {
  private includes = ['airports', 'flights'];

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

    return this.airlineRepo.findOne({
      where: { id },
      relations: this.includes,
    });
  }

  getAll() {
    return this.airlineRepo.find({
      where: { isActive: true, isArchived: false },
      relations: this.includes,
    });
  }

  async update(id: string, attrs: Partial<Airline>) {
    const airline = await this.getById(id);

    if (!airline) {
      throw new NotFoundException(`Airline with id ${id} not found`);
    }

    Object.assign(airline, attrs);

    return this.airlineRepo.save(airline);
  }

  async remove(id: string) {
    const airline = await this.getById(id);

    if (!airline) {
      throw new NotFoundException(`Airline with id ${id} not found`);
    }

    return this.airlineRepo.remove(airline);
  }
}
