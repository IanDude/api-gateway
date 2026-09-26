import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
        {
          name: 'ORDERS_SERVICE',
          transport: Transport.REDIS,
          options: {
            host: 'localhost',
            port: 6379,
          },
        },
        {
          name: 'USERS_SERVICE',
          transport: Transport.REDIS,
          options: {
            host: 'localhost',
            port: 6379,
          },
        },
      ],
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
