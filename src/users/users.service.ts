import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const user = this.prisma.users.create({
      data: {
        name: createUserDto.name,
      },
    });
    return user;
  }

  findAll() {
    return this.prisma.users.findMany();
  }
  // findAll() {
  //   return this.userModel.find().exec();
  // }
  returnHey() {
    return 'Hey!';
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
