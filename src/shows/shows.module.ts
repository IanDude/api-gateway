import { Module } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
        {
          name: 'SHOWS_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'catalog-queue',
            queueOptions: { durable: true },
          },
        },
      ],
    }),
  ],
  controllers: [ShowsController],
  providers: [ShowsService],
})
export class ShowsModule {}
