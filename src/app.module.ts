import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { config } from './config';
import { TranslateModule } from './translate/translate.module';
import { GTranslateModule } from './g-translate/g-translate.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TranslateModule,
    GTranslateModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  // imports: [UsersModule, CommentsModule, AuthModule, TranslateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
