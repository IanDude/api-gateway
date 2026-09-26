import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CheckoutDto } from './dto/checkout.dto';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_SERVICE') private ordersClient: ClientProxy,
    @Inject('USERS_SERVICE') private usersService: ClientProxy,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  checkout(checkout: CheckoutDto) {
    return this.ordersClient.send('ORDERS.CHECKOUT', { ...checkout }).pipe(
      catchError((error: RpcException) => {
        this.usersService.emit('SYSTEM.AUDIT_LOG', {
          endpoint: '/orders/checkout',
          error: error.message,
          timestamp: new Date().toISOString(),
        });
        return throwError(
          () => new HttpException(error.message, HttpStatus.BAD_REQUEST),
        );
      }),
    );
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return this.ordersClient.send('ORDERS.GETONE', { id: id });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
