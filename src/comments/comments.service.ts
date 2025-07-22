import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '../prisma.service';

// import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.comments.findMany();
  }
  // user(userId: string) {
  //   return this.prisma.uses.findUnique({
  //     where: { id: userId },
  //   });
  // }
  create(createCommentDto: CreateCommentDto) {
    const comment = this.prisma.comments.create({
      data: {
        text: createCommentDto.text,
        usersId: createCommentDto.user,
      },
    });
    return comment;
  }
}
