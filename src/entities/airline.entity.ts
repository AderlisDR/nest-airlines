import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Airport } from './airport.entity';
import { BaseEntity } from './base.entity';
import { Flight } from './flight.entity';

@Entity({ name: 'airline' })
export class Airline extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToMany(() => Airport, (airport) => airport.airlines)
  airports: Airport[];

  @OneToMany(() => Flight, (flight) => flight.airline)
  flights: Flight[];
}
