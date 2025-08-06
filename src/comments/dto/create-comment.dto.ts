import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  parentId: null | string;
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsString()
  @IsNotEmpty()
  user: string;
}
