import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
