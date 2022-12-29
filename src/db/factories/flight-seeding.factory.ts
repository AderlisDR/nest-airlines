import { setSeederFactory } from 'typeorm-extension';
import { Flight } from '../../entities/flight.entity';

export default setSeederFactory(Flight, (faker) => {
  const flight = new Flight();
  flight.flightNumber = faker.random.alphaNumeric(4, { casing: 'upper' });
  flight.source = faker.random.words();
  flight.destination = faker.random.words();
  flight.departurDateTime = faker.date.soon();
  flight.arrivalDateTime = faker.date.soon(2);

  return flight;
});
