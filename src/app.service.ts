import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('ORDERS_SERVICE') private ordersService: ClientProxy,
    @Inject('USERS_SERVICE') private usersService: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onDashboardData(userUUID: string) {
    const userPromise = lastValueFrom(
      this.usersService.send('USERS.GETONE', {
        uuid: userUUID,
      }),
    );

    const orderPromise = lastValueFrom(
      this.ordersService.send('ORDERS.FIND_BY_USER', {
        userUUID: userUUID,
      }),
    );

    const [user, order] = await Promise.all([userPromise, orderPromise]);
    return { profile: user, history: order };
  }
}
