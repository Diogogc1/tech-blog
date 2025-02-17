import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import UserPayload from 'src/dtos/payload/user.payload';
import UserResponse from 'src/dtos/response/user.response';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: UserPayload })
  create(@Body() userPayload: UserPayload): Promise<UserResponse> {
    return this.userService.create(userPayload);
  }

  @Get()
  getAll(): Promise<UserResponse[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<UserResponse> {
    return this.userService.findById(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() userPayload: UserPayload,
  ): Promise<number> {
    return this.userService.update(Number(id), userPayload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.userService.delete(Number(id));
  }
}
