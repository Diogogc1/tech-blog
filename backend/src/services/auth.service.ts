import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import AuthPayload from 'src/dtos/payload/auth.payload'
import { UserService } from './user.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(authPayload: AuthPayload): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(authPayload.email)
    if (!user || !(await bcrypt.compare(authPayload.password, user.password))) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, username: user.name }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
