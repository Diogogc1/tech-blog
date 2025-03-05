import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import config from 'mikro-orm.config'
import { AuthModule } from './auth.module'
import { AppController } from './controllers/app.controller'
import { ArticleTagController } from './controllers/article-tag.controller'
import { ArticleController } from './controllers/article.controller'
import { NotificationController } from './controllers/notification.controller'
import { TagController } from './controllers/tag.controller'
import { UserController } from './controllers/user.controller'
import { GatewayModule } from './gateways/gateway.module'
import ArticleTagRepository from './repositories/article-tag.repository'
import ArticleRepository from './repositories/article.repository'
import NotificationRepository from './repositories/notification.repository'
import TagRepository from './repositories/tag.repository'
import UserRepository from './repositories/user.repository'
import { AppService } from './services/app.service'
import { ArticleTagService } from './services/article-tag.service'
import { ArticleService } from './services/article.service'
import { NotificationService } from './services/notification.service'
import { TagService } from './services/tag.service'
import { UserService } from './services/user.service'

@Module({
  imports: [MikroOrmModule.forRoot(config), AuthModule, GatewayModule],
  controllers: [
    AppController,
    UserController,
    TagController,
    ArticleController,
    ArticleTagController,
    NotificationController,
  ],
  providers: [
    AppService,
    UserService,
    TagService,
    ArticleService,
    ArticleTagService,
    NotificationService,

    UserRepository,
    TagRepository,
    ArticleRepository,
    ArticleTagRepository,
    NotificationRepository,
  ],
})
export class AppModule {}
