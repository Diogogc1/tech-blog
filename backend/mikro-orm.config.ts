import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import * as dotenv from 'dotenv';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
import { Article } from 'src/entities/article.entity';
import { ArticleTag } from 'src/entities/article-tag.entity';
import { CommentReply } from 'src/entities/comment-reply.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { Comment } from 'src/entities/comment.entity';

dotenv.config();

const config: MikroOrmModuleSyncOptions = {
  entities: [Article, ArticleTag, Comment, CommentReply, Tag, User],
  dbName: process.env.DB_NAME,
  extensions: [Migrator, EntityGenerator, SeedManager],
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  driver: PostgreSqlDriver,
  debug: true,
  autoLoadEntities: true,
};

export default config;
