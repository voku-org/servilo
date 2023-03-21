import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<any> {
    return this.authService.login(user);
  }  

  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.register(user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyToken(@Req() req: any): Promise<any> {
    return this.authService.verify(req.user);
  }  
}
