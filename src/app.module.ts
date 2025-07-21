import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    MongooseModule.forRoot(
      'mongodb+srv://lefty:lefty@cluster0.fpuucsj.mongodb.net/nestmigrate',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
