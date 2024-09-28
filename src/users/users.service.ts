import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UserEntity } from './entities/user.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return this.usersRepository.remove(id);
  }
}
