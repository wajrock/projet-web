import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly service: UsersService,
    private jwtService: JwtService,
  ) {}
  public async validateUser(id: number, password: string): Promise<User> {
    const user = await this.service.getById(id);
    return (await bcrypt.compare(password, user.password)) ? user : undefined;
  }

  async login(user: any) {
    const payload = { username: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
