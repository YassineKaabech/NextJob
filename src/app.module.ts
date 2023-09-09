import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './components/jobs/jobs.module';
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { PhoneNumberVerificationModule } from './components/phone-number-verification/phone-number-verification.module';


import databaseConfig from './databaseConfig';


@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig.ormConfig),
    AuthModule,
    JobsModule,
    UsersModule,
    PhoneNumberVerificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
