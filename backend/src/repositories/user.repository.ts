import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import UserPayload from 'src/dtos/payload/user.payload';
import { User } from 'src/entities/user.entity';

export default class UserRepository {
  private userRepo: EntityRepository<User>;

  constructor(private readonly em: EntityManager) {
    this.userRepo = this.em.getRepository(User);
  }

  async create(userPayload: UserPayload): Promise<User> {
    const user = this.userRepo.create(userPayload);
    await this.em.persistAndFlush(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find({});
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepo.findOne({ id });
  }

  async update(id: number, data: UserPayload): Promise<number> {
    return this.userRepo.nativeUpdate({ id }, data);
  }

  async delete(id: number): Promise<number> {
    return this.userRepo.nativeDelete({ id });
  }
}
