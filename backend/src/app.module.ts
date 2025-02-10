import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
import { User } from './entities/User.entity';

dotenv.config();

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: [User],
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      driver: PostgreSqlDriver,
      debug: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
