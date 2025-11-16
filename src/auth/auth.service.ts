import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserForAuth(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, userName: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  // async signIn(username: string, password: string): Promise<any> {
  //   const user = await this.usersService.getUserForAuth(username, password);
  //   if (user?.password !== password) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { userId: user.id, userName: user.name };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}
