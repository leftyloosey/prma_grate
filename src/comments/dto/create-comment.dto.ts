import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  parentId: null | string;
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  user: string;
}
