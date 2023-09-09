import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Job } from './components/jobs/entities/job.entity';
import { JobImage } from './components/jobs/entities/jobImage.entity';
import { PhoneNumberVerification } from './components/phone-number-verification/entities/phone-number-verification.entity';
import { Users } from './components/users/user.entity';
import { DataSourceOptions } from 'typeorm';
import * as process from 'process';

const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: parseInt(process.env.DATABASE_PORT),
  username: 'root',
  password: 'root',
  database: 'njdb',
  entities: [Job, Users, PhoneNumberVerification, JobImage],
  synchronize: true,
};

const dataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: parseInt(process.env.DATABASE_PORT),
  username: 'root',
  password: null,
  database: 'njdb',
  entities: [Job, Users, PhoneNumberVerification, JobImage],
  synchronize: true,
};

const databaseConfig = {
  dataSourceConfig,
  ormConfig
}

export default databaseConfig;
