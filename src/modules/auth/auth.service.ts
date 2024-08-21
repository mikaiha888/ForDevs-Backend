import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Plan } from '../plan/entities/plan.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
    private jwtAuthService: JwtService,
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

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const foundUser = await this.userRepository.findOneBy({ email });
    if (!foundUser) throw new HttpException('User Not Found', 404);
    const validatedPassword = await compare(password, foundUser.password);
    if (!validatedPassword) throw new HttpException('Invalid Password', 403);
    const token = await this.jwtAuthService.sign({
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      plan: { planName: foundUser.plan.planName },
    });
    return { token, loggedUser: foundUser };
  }
}
