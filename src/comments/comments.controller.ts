import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/withuser')
  findAllWithUser() {
    return this.commentsService.getAllWithUser();
  }
  @Get('')
  findTopWithUser() {
    return this.commentsService.getTopLevelWithUser();
  }
  @Get('/just')
  justGetAll() {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  findAllOneUser(@Param('id') id: string) {
    return this.commentsService.getCommentsByParentId(id);
  }
  @Get('user/:id')
  findProfileComments(@Param('id') id: string) {
    return this.commentsService.getCommentsByUser(id);
  }

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentsService.update(+id, updateCommentDto);
  // }
}
