import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { Job } from './entities/job.entity';
import { Users } from '../users/user.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async create(data: object, user: Users) {
    const response = await this.jobsRepository
      .save({ ...data, user })
      .then((res) => res);
    if (response) {
      return { status: 'OK', message: 'Job created successfully' };
    } else {
      return { status: 'KO', message: 'Job cannot be created' };
    }
  }
  findAll(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  findOne(id: number): Promise<Job> {
    return this.jobsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    data: object,
  ): Promise<Job | UpdateResult | undefined> {
    const job = await this.findOne(id).then((res) => res);
    if (job)
      return await this.jobsRepository.update(id, data).then((res) => res);
    return;
  }

  async remove(id: number) {
    return await this.jobsRepository.delete(id);
  }
}
