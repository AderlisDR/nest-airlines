import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlinesModule } from '../airlines/airlines.module';
import { Airline } from '../entities/airline.entity';
import { Airport } from '../entities/airport.entity';
import { Flight } from '../entities/flight.entity';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight, Airline, Airport]),
    AirlinesModule,
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
