import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { jwtConfig } from 'src/config/jwt.config';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
        UserModule, 
        PassportModule.register({defaultStrategy: 'jwt'}), 
        JwtModule.registerAsync(jwtConfig)],
    controllers: [AuthController],
    providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
