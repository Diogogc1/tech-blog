import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/auth.controller';
import UserRepository from './repositories/user.repository';
import { jwtConstants } from './constants';

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60m' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, UserRepository],
})
export class AuthModule { }