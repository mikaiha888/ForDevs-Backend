import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({summary: 'register user'})
  register(@Body() registerAuthDto: RegisterAuthDto){
    return this.authService.register(registerAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({summary: 'log in user'})
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
