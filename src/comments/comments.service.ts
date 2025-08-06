import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '../prisma.service';

// import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  getAllComments() {
    return this.prisma.comments.findMany();
  }

  getTopLevelWithUser() {
    return this.prisma.comments.findMany({
      where: { parentId: null },
      select: {
        text: true,
        timestamp: true,
        id: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  getAllWithUser() {
    return this.prisma.comments.findMany({
      select: {
        text: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  getCommentsByParentId(id: string) {
    return this.prisma.comments.findMany({
      where: { parentId: id },
      select: {
        parentId: true,
        timestamp: true,
        text: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  getCommentsByUser(id: string) {
    return this.prisma.comments.findMany({
      where: { usersId: id },
    });
  }

  createComment(createCommentDto: CreateCommentDto) {
    const comment = this.prisma.comments.create({
      data: {
        text: createCommentDto.text,
        usersId: createCommentDto.user,
        parentId: createCommentDto.parentId || null,
        timestamp: new Date(),
      },
    });
    return comment;
  }

  deleteComment(id: string) {
    const deleteManyComment = this.prisma.comments
      .deleteMany({
        where: { parentId: id },
      })
      .then(() => {
        const deleteComment = this.prisma.comments.delete({
          where: {
            id: id,
          },
        });
        return deleteComment;
      });
    return deleteManyComment;
  }
  // deleteMany(id: string) {
  //   const deleteComment = this.prisma.comments.deleteMany({
  //     where: { parentId: id },
  //   });

  //   return deleteComment;
  // }
}
