import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService
  ) { }

    public async validate(userData: LoginUserDto): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

    public async login(user: LoginUserDto): Promise< any | { status: number }>{
        return await this.validate(user).then((userData)=>{
          if(!(userData && userData.validatePassword(user.password))){
            return { status: 404 };
          }
          let payload = { id: userData.id, names: userData.names };
          const accessToken = this.jwtService.sign(payload);

          return {
             expires_in: '1 day',
             access_token: accessToken,
             user_id: payload,
             status: 200
          };

        });
    }

    public async register(user: CreateUserDto): Promise<any>{
        return this.userService.create(user)
    } 
}
