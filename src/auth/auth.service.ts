import { Injectable, UnauthorizedException } from '@nestjs/common';
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
        const findedUser = await this.userService.findByEmail(userData.username);
        return findedUser;
    }

    public async verify(decodedUser: any): Promise<any> {
      const found = await this.userService.findOne(decodedUser.id);
      if(!found)
      {
         throw new UnauthorizedException();
      }
      return { 
        id: found.id, 
        names: found.names,
        email: found.email,
        username: found.username,
        profile_picture: found.profile_picture,
        gender: found.gender
      };
    }

    public async login(user: LoginUserDto): Promise< any | { status: number }>{
        return await this.validate(user).then(async (userData)=>{
          const valid = await userData.validatePassword(user.password);
          if(!valid){
            return { status: 404 };
          }
          let payload = { 
            id: userData.id, 
            names: userData.names, 
            email: userData.email, 
            username: userData.username,
            profile_picture: userData.profile_picture,
            gender: userData.gender 
          };

          const accessToken = this.jwtService.sign(payload);

          return {
             expires_in: '1 day',
             access_token: accessToken,
             ...payload,
             status: 200
          };
        });
    }

    public async register(user: CreateUserDto): Promise<any>{
        return this.userService.create(user)
    } 
}
