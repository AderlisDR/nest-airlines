import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Airline } from './airline.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'airport' })
export class Airport extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @ManyToMany(() => Airline)
  @JoinTable()
  airlines: Airline;
}
