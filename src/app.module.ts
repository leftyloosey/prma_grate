import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
// import { PrismaModule } from 'nestjs-prisma';

// import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TranslateModule } from './translate/translate.module';

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    AuthModule,
    TranslateModule,
    // PrismaModule.forRoot({
    //   isGlobal: true,
    // }),
    // MongooseModule.forRoot(
    //   'mongodb+srv://lefty:lefty@cluster0.fpuucsj.mongodb.net/nestmigrate',
    // ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
