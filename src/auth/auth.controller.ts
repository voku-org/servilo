import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<any> {
    return this.authService.login(user);
  }  

  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.register(user);
  }  
}
