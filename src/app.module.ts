import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ShowsModule } from './shows/shows.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';

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
    ShowsModule,
    CacheModule.register({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 10 }],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
