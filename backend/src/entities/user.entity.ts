import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import UserPayload from 'src/dtos/payload/user.payload'

@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number

  @Property()
  name!: string

  @Property({ unique: true })
  email!: string

  @Property({ unique: true })
  password!: string

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ default: true })
  status: boolean

  constructor(userPayload: UserPayload) {
    this.name = userPayload.name
    this.email = userPayload.email
    this.password = userPayload.password
  }

  static create(userPayload: UserPayload) {
    return new User(userPayload)
  }
}
