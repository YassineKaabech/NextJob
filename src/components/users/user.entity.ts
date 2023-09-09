import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from '../jobs/entities/job.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;


  @Column()
  profileImageFileName?: string;

  @Column({ default: null, type: 'date' })
  birthdate: Date;

  @Column()
  role: string;

  @Column()
  password?: string;

  @Column({ default: null, type: 'datetime' })
  created_at?: Date;

  @Column({ default: null, type: 'datetime' })
  updated_at?: Date;


  @OneToMany(() => Job, (job) => job.author)
  jobs?: Job[];
}
