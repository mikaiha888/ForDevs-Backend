import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PlanService } from '../plan/plan.service';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private planService: PlanService,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const password = await hash(registerAuthDto.password, 10);
    const plan = await this.planService.findOne('Free');
    return await this.userService.create({
      ...registerAuthDto,
      password,
      plan,
    });
  }

  async login(user: any) {
    return {
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
      loggedUser: user,
    };
  }
}
