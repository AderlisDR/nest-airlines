import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Airport } from '../../entities/airport.entity';
import { Airline } from '../../entities/airline.entity';
import { Flight } from '../../entities/flight.entity';

export default class InitialDatabaseSeed implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const airports = await factoryManager.get(Airport).saveMany(5);
    const airlines = await factoryManager
      .get(Airline)
      .saveMany(5, { airports: airports });

    await factoryManager.get(Flight).saveMany(20, {
      airline: airlines[Math.floor(Math.random() * airlines.length)],
    });
  }
}
