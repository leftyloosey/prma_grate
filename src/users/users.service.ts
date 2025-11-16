/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.users.findMany();
  }
  async getUserWords(id: string) {
    return this.prisma.users.findUnique({
      where: { id: id },
      include: {
        words: true,
      },
    });
  }

  async getUserForAuth(name: string, password: string) {
    const user = await this.prisma.users.findUnique({
      where: { name: name },
    });
    let isMatch: boolean = false;
    if (user?.password === password) return user;
    if (user?.password)
      isMatch = await bcrypt.compare(password, user?.password);
    if (isMatch) return user;
    throw new UnauthorizedException();
  }
  // getUserForAuth(name: string, password: string) {
  //   return this.prisma.users.findUnique({
  //     where: { name: name, password: password },
  //   });
  // }

  async createUser(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const password: string = createUserDto.password;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = this.prisma.users.create({
      data: {
        name: createUserDto.username,
        password: hash,
      },
    });
    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
