import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: createUserDto,
      include: {
        posts: true,
      },
    });
  }

  async find(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      include: {
        posts: {
          select: {
            title: true,
            published: true,
            content: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          select: {
            title: true,
            published: true,
            content: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
