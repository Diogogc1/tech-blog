
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import AuthPayload from 'src/dtos/payload/auth.payload';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() authPayload: AuthPayload) {
        return this.authService.login(authPayload);
    }
}
