import { Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import UserPayload from 'src/dtos/payload/user.payload'
import UserResponse from 'src/dtos/response/user.response'
import { User } from 'src/entities/user.entity'
import UserRepository from 'src/repositories/user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userPayload: UserPayload): Promise<Omit<UserResponse, 'password'>> {
    const hashedPassword = await bcrypt.hash(userPayload.password, 10)

    const user = User.create({ ...userPayload, password: hashedPassword })
    const response = await this.userRepository.create(user)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResponse } = response
    return userResponse
  }

  async findAll() {
    const users = await this.userRepository.findAll()
    const userResponses: UserResponse[] = users.map((user) => new UserResponse(user))
    return userResponses
  }

  async findById(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    const userResponse = new UserResponse(user)
    return userResponse
  }

  async findByEmail(email: string): Promise<UserResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`)
    }

    const userResponse = new UserResponse(user)
    return userResponse
  }

  async update(id: number, userPayload: UserPayload): Promise<number> {
    const user = User.create(userPayload)
    await this.findById(id)
    return await this.userRepository.update(id, user)
  }

  async delete(id: number): Promise<number> {
    await this.findById(id)
    return await this.userRepository.delete(id)
  }
}
