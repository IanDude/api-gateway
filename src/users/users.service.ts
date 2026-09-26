import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, map, throwError, timeout } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private usersClient: ClientProxy) {}

  create(createUserDto) {
    return this.usersClient.send('USERS.CREATEONE', createUserDto).pipe(
      catchError((error: Error) => {
        return throwError(() => new NotAcceptableException(error.message));
      }),
    );
  }

  login() {
    this.usersClient.emit('USERS.LOGIN', {});
  }

  findAll() {
    return this.usersClient.send('USERS.FINDALL', {});
  }

  findOne(uuid: string) {
    return this.usersClient.send('USERS.GETONE', { uuid: uuid }).pipe(
      map((user) => {
        delete user.password;
        delete user.id;
        return user;
      }),
      catchError((error: Error) => {
        return throwError(() => new NotFoundException(error.message));
      }),
    );
  }

  getFast() {
    return this.usersClient.send('USERS.FAST', {}).pipe(
      timeout(6000),
      catchError((error: Error) => {
        return throwError(() => new NotFoundException(error.message));
      }),
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
