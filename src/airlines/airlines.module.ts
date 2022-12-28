import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportsModule } from '../airports/airports.module';
import { Airline } from '../entities/airline.entity';
import { Airport } from '../entities/airport.entity';
import { AirlinesController } from './airlines.controller';
import { AirlinesService } from './airlines.service';

@Module({
  imports: [TypeOrmModule.forFeature([Airline, Airport]), AirportsModule],
  controllers: [AirlinesController],
  providers: [AirlinesService],
  exports: [AirlinesService],
})
export class AirlinesModule {}
