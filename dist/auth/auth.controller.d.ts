import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: LoginUserDto): Promise<any>;
    signup(user: CreateUserDto): Promise<any>;
    verifyToken(req: any): Promise<any>;
}
