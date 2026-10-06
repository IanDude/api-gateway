import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guards/strategies/local.strategy';
import { AccessTokenStrategy } from './guards/strategies/jwt-access.strategy';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
        {
          name: 'USERS_SERVICE',
          // transport: Transport.REDIS,
          transport: Transport.RMQ,
          options: {
            // host: 'localhost',
            // port: 6379,
            urls: ['amqp://localhost:5672'],
            queue: 'users-queue',
            queueOptions: { durable: true },
          },
        },
      ],
    }),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, AccessTokenStrategy],
  exports: [UsersService],
})
export class UsersModule {}
