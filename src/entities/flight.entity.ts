import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { Airline } from './airline.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'flight' })
export class Flight extends BaseEntity {
  @Column({ type: 'varchar', length: 4 })
  flightNumber: string;

  @Column({ type: 'varchar', length: 100 })
  source: string;

  @Column({ type: 'varchar', length: 100 })
  destination: string;

  @CreateDateColumn({ type: 'timestamptz' })
  departurDateTime: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  arrivalDateTime: Date;

  @ManyToOne(() => Airline, (airline) => airline.flights)
  airline: Airline;
}
