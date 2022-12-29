import { setSeederFactory } from 'typeorm-extension';
import { Airline } from '../../entities/airline.entity';

export default setSeederFactory(Airline, (faker) => {
  const airline = new Airline();
  airline.name = `seed:${faker.random.words()}`;

  return airline;
});
