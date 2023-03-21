import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
export declare class AuthService {
    private userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validate(userData: LoginUserDto): Promise<User>;
    verify(decodedUser: any): Promise<any>;
    login(user: LoginUserDto): Promise<any | {
        status: number;
    }>;
    register(user: CreateUserDto): Promise<any>;
}
