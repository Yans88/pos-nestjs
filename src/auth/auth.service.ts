import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async cekUser(username: string, password: string) {
    const user = await this.userService.findUsername(username);
    if (user) {
      const valid = this.userService.compare(password, user.password);
      if (valid) {
        return user;
      } else {
        throw new BadRequestException({ message: 'password salah' });
      }
    } else {
      throw new BadRequestException({ message: 'username tidak ditemukan' });
    }
  }

  generateToken(user: any) {
    const dataToken = { id: user.id };
    const token = this.jwtService.sign(dataToken);
    return { token: token };
  }
}
