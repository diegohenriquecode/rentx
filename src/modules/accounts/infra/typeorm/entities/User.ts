import { v4 as uuidV4 } from 'uuid'
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity("users")
class User {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  driver_license!: string;

  @Column()
  isAdmin!: boolean;

  @Column()
  avatar?: string;

  @Column()
  created_at!: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }

}

export { User }