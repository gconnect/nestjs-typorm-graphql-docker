import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/Users';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.usersRepository.find();
  }

  getUserById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  createUser(userData: CreateUserInput) {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }
}
