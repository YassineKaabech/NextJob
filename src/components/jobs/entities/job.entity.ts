import { Users as User } from 'src/components/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  BeforeSoftRemove,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { JobImage } from './jobImage.entity';

@Entity()
export class Job {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  objet: string;

  @Column()
  recompense: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column()
  long: string;

  @Column()
  lat: string;

  @Column()
  adresse: string;

  @Column()
  status: string;

  @Column({ default: null, type: 'datetime' })
  createdAt?: Date;

  @Column({ default: null, type: 'datetime' })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.jobs)
  user: User;

  @OneToMany(() => JobImage, (jobImage) => jobImage.job)
  images: JobImage[];
}
