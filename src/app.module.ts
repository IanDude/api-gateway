import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register({
      clients: [
        {
          name: 'USERS_SERVICE',
          transport: Transport.REDIS,
          options: {
            host: 'localhost',
            port: 6379,
          },
        },
        {
          name: 'ORDERS_SERVICE',
          transport: Transport.REDIS,
          options: {
            host: 'localhost',
            port: 6379,
          },
        },
      ],
    }),
    UsersModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
