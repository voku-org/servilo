import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UtilsService } from 'src/utils/utils.service';
export declare class UserService {
    private userRepo;
    private utilService;
    constructor(userRepo: Repository<User>, utilService: UtilsService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findByEmail(email: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findOneByUserName(username: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
