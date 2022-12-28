import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Flight } from './flight.entity';

@Entity({ name: 'airline' })
export class Airline extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Flight, (flight) => flight.airline)
  flights: Flight[];
}
