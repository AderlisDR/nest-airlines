import { setSeederFactory } from 'typeorm-extension';
import { Airport } from '../../entities/airport.entity';

export default setSeederFactory(Airport, (faker) => {
  const airport = new Airport();
  airport.name = `seed:${faker.random.words()}`;
  airport.city = faker.address.cityName();
  airport.state = faker.address.state();

  return airport;
});
