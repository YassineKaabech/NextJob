import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Res,
  HttpStatus,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import ActionResponse from 'src/utils/ActionResponse';
import { ParseFormDataJsonPipe } from 'src/pipes/ParseFormDataJsonPipe';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(      new ParseFormDataJsonPipe({ except: ['image'] }),
    new ValidationPipe(),

    ) createJobDto: CreateJobDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const idByJwt = req.user.payload.id;
    const user = await this.usersService.findOneById(+idByJwt);
    if (user) {
      console.log(createJobDto);
      const result = await this.jobsService.create({...createJobDto,createdAt:new Date(),updatedAt:new Date(), status:'ACTIVE'}, user);
      res
        .status(HttpStatus.OK)
        .json(new ActionResponse(HttpStatus.OK, 'Job created successfully'));
    } else {
      res
        .status(HttpStatus.NOT_FOUND)
        .json(new ActionResponse(HttpStatus.NOT_FOUND, 'Cannot find user'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    let job = await this.jobsService.findOne(+id);
    if (job) return res.status(HttpStatus.OK).json(job);
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: 'This Job no longer exist or has been removed' });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Res() res: Response,
  ) {
    const response = await this.jobsService.update(+id, updateJobDto);
    if (response)
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Job information updated successfully' });
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: 'The Job to be updated no longer exist' });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.jobsService.remove(+id);
    res
      .status(HttpStatus.OK)
      .json({ message: 'Job details deleted successfully' });
  }
}
