import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, map, throwError, timeout } from 'rxjs';
import { Payload } from './interfaces/payload.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private usersClient: ClientProxy) {}

  create(createUserDto: CreateUserDto) {
    return this.usersClient.send('USERS.CREATEONE', createUserDto).pipe(
      catchError((error: Error) => {
        return throwError(() => new NotAcceptableException(error.message));
      }),
    );
  }

  loginNotif() {
    this.usersClient.emit('USERS.LOGINNOTIF', {});
  }

  login(user) {
    return this.usersClient.send('USERS.LOGIN', user);
  }

  findAll() {
    return this.usersClient.send('USERS.FINDALL', {});
  }

  findOne(userData: { uuid?: string; username?: string; id?: number }) {
    return this.usersClient.send('USERS.GETONE', userData).pipe(
      timeout(10000),
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

  async validateLocal(username: string, password: string) {
    return await lastValueFrom(
      this.usersClient.send('USERS.VALIDATE_LOCAL', {
        username: username,
        password: password,
      }),
    );
  }

  async validateJwt(payload: Payload) {
    return await lastValueFrom(
      this.usersClient.send('USERS.VALIDATE_JWT', payload),
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
