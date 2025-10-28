import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(createUserDto: CreateUserDto) {
    const user = this.prisma.users.create({
      data: {
        name: createUserDto.name,
        password: createUserDto.password,
      },
    });
    return user;
  }

  getAllUsers() {
    return this.prisma.users.findMany();
  }
  getUserWords(id: string) {
    return this.prisma.users.findUnique({
      where: { id: id },
      include: {
        words: true,
      },
    });
  }
  getUserForAuth(name: string, password: string) {
    return this.prisma.users.findUnique({
      where: { name: name, password: password },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
