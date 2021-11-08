import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetCategory } from './petCategory.entity';

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column()
  @Field(() => Int)
  ownerId: number;

  @ManyToMany(() => Owner, (owner) => owner.pets)
  @Field(() => Owner)
  owner: Owner;

  @ManyToMany(
    () => PetCategory,
    (petCategory: PetCategory) => petCategory.pets,
    { eager: true },
  )
  @Field(() => [PetCategory])
  @JoinTable()
  // We can define a JoinTable as seen below
  // This way we can define the column names and table name
  // otherwise TypeORM will choose for us.
  //
  // @JoinTable({
  //   name: 'pet_petcategory', // table name for the junction table of this relation
  //   joinColumn: {
  //     name: 'pet_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'pet_category_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  petCategories: PetCategory[];

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  @Field()
  createdOn: Date;
}
