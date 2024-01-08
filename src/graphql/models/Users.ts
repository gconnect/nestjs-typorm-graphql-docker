import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserSettings } from './UserSettings';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field({ nullable: true })
  displayName?: string;

  @OneToOne(() => UserSettings)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSettings;
}
