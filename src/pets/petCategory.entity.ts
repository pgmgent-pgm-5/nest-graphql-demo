import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
@ObjectType()
export class PetCategory {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name?: string;

  @ManyToMany(() => Pet, (pet: Pet) => pet.petCategories)
  pets?: Pet[];
}
