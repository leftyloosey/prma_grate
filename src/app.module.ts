import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { CommentsModule } from './comments/comments.module';
// import { PrismaModule } from 'nestjs-prisma';

// import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './auth/auth.module';
import { TranslateModule } from './translate/translate.module';
import { GTranslateModule } from './g-translate/g-translate.module';

@Module({
  imports: [TranslateModule, GTranslateModule, UsersModule],
  // imports: [UsersModule, CommentsModule, AuthModule, TranslateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
