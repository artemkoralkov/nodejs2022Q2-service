import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => +new Date(value))
  createdAt: number;

  @UpdateDateColumn()
  @Transform(({ value }) => +new Date(value))
  updatedAt: string;
}
