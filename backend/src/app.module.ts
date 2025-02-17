import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import config from 'mikro-orm.config';
import { AppController } from './controllers/app.controller';
import { TagController } from './controllers/tag.controller';
import { UserController } from './controllers/user.controller';
import ArticleTagRepository from './repositories/article-tag.repository';
import ArticleRepository from './repositories/article.repository';
import TagRepository from './repositories/tag.repository';
import UserRepository from './repositories/user.repository';
import { AppService } from './services/app.service';
import { ArticleTagService } from './services/article-tag.service';
import { ArticleService } from './services/article.service';
import { TagService } from './services/tag.service';
import { UserService } from './services/user.service';
import { ArticleController } from './controllers/article.controller';
import { ArticleTagController } from './controllers/article-tag.controller';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  controllers: [
    AppController,
    UserController,
    TagController,
    ArticleController,
    ArticleTagController,
  ],
  providers: [
    AppService,
    UserService,
    TagService,
    ArticleService,
    ArticleTagService,

    UserRepository,
    TagRepository,
    ArticleRepository,
    ArticleTagRepository,
  ],
})
export class AppModule { }
