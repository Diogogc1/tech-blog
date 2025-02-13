import UserPayload from 'src/dtos/payload/user.payload';
import UserRepository from 'src/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import UserResponse from 'src/dtos/response/user.response';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userPayload: UserPayload): Promise<UserResponse> {
    const user: User = await this.userRepository.create(userPayload);
    const UserResponse: UserResponse = user;
    return UserResponse;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    const UserResponse: UserResponse[] = users;
    return UserResponse;
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, data: UserPayload) {
    return await this.userRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
