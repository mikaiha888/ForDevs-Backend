import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Plan } from '../plan/entities/plan.entity';
import { User } from '../user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const password = await hash(registerAuthDto.password, 10);
    const plan = await this.planRepository.findOne({
      where: { planName: 'Free' },
    });
    const newUser = this.userRepository.create({
      ...registerAuthDto,
      password,
      plan,
    });
    return this.userRepository.save(newUser);
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
