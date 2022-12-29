import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AirlineDto } from './airlines/dtos/airline.dto';
import { AirportDto } from './airports/dtos/airport.dto';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { FlightDto } from './flights/dtos/flight.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Airports, Airlines and Flights API')
        .setDescription(
          'Application to handle CRUD for Airports, Airlines and Flights.',
        )
        .build(),
      {
        extraModels: [AirportDto, AirlineDto, FlightDto],
      },
    );

    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(3000);
}
bootstrap();
