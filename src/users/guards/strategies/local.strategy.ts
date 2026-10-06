import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super(
      //   {
      //   usernameField: 'username',
      //   passwordField: 'password',
      // }
    );
  }

  async validate(username: string, password: string) {
    const user = await this.userService.validateLocal(username, password);

    return user;
  }
}
