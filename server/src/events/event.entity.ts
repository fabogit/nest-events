import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity('event', { name: 'event' })
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @Column()
  description: string;

  @Column()
  when: Date;

  @Column()
  address: string;
}
