import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Repository } from 'typeorm';
import { AirlinesService } from '../airlines/airlines.service';
import { Flight } from '../entities/flight.entity';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';

@Injectable()
export class FlightsService {
  private includes = ['airline'];

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

  getById(id: string) {
    if (!id) {
      return null;
    }

    return this.flightRepo.findOne({
      where: { id },
      relations: this.includes,
    });
  }

  getAll() {
    return this.flightRepo.find({
      where: { isActive: true, isArchived: false },
      relations: this.includes,
    });
  }

  async update(id: string, attrs: Partial<UpdateFlightDto>) {
    const flight = await this.getById(id);

    if (!flight) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }

    const dateAttrs = this.getDateAttributesFromUpdateFlightDto(attrs);
    Object.assign(flight, attrs, dateAttrs);

    return this.flightRepo.save(flight);
  }

  private getDateAttributesFromUpdateFlightDto(
    updateDto: Partial<UpdateFlightDto>,
  ): Partial<{ departurDateTime: Date; arrivalDateTime: Date }> {
    const dateAttrs = {};

    if (updateDto.departurDateTime) {
      Object.assign(dateAttrs, {
        departurDateTime: moment(
          updateDto.departurDateTime,
          'YYYY-MM-DD HH:mm',
          true,
        ).toDate(),
      });
    }

    if (updateDto.arrivalDateTime) {
      Object.assign(dateAttrs, {
        arrivalDateTime: moment(
          updateDto.arrivalDateTime,
          'YYYY-MM-DD HH:mm',
          true,
        ).toDate(),
      });
    }

    return dateAttrs;
  }

  async remove(id: string) {
    const flight = await this.getById(id);

    if (!flight) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }

    return this.flightRepo.remove(flight);
  }
}
