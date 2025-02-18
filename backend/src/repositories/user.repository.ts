import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export default class UserRepository {
  private userRepo: EntityRepository<User>;

  constructor(private readonly em: EntityManager) {
    this.userRepo = this.em.getRepository(User);
  }

  async create(data: User): Promise<User> {
    const user = this.userRepo.create(data);
    await this.em.persistAndFlush(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find({ status: true });
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepo.findOne({ id, status: true });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ email: email, status: true });
  }

  async update(id: number, data: User): Promise<number> {
    return this.userRepo.nativeUpdate({ id, status: true }, data);
  }

  async delete(id: number): Promise<number> {
    return this.userRepo.nativeUpdate({ id, status: true }, { status: false });
  }
}
