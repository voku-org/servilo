import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {v1 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    private utilService: UtilsService
  ){}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user  = this.userRepo.create(createUserDto);
    user.id = uuid();
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, user.salt);
    user.age = this.utilService.calculateAge(createUserDto.birthday);
    await this.userRepo.save(user);
    return {
        email: user.email,
        names: user.names,
    };
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepo.findOne({
        where: {
            email: email,
        }
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find({});
  }

  async findOne(id: string) {
    return await this.userRepo.findOne({where: {id: id}});
  }

  async findOneByUserName(username: string) {
    return await this.userRepo.findOne({where: {username: username}});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let toUpdate: any = updateUserDto;
    for(let key of Object.keys(toUpdate))
    {
      if(toUpdate[key] === undefined || toUpdate[key] === "" || key === 'id' || key === 'last_connection' || key === 'registration_date')
      {
        delete toUpdate[key];
      }
    }
    return await this.userRepo.update({id: id}, toUpdate);
  }

  async remove(id: string) {
    return await this.userRepo.delete({id: id});
  }
}
