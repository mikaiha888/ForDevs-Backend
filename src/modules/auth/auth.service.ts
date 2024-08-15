import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtAuthService: JwtService,
  ) {}
  async register(registerAuthDto: RegisterAuthDto) {
    const password = await hash(registerAuthDto.password, 10);
    const newUser = this.userRepository.create({ ...registerAuthDto, password });
    console.log(newUser);
    return newUser
    
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
      plan: foundUser.plan,
    });
    return token;
  }
}
