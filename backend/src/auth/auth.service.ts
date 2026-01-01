import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: {
    username: string;
    email: string;
    password: string;
  }) {
    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      ...data,
      password: hashed,
    });

    return {
      id: user._id,
      username: user.username,
      email: user.email,
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, username: user.username };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
