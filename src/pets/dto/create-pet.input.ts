import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { PetCategoryInput } from './petcategory.input';

@InputType()
export class CreatePetInput {
  @IsAlpha()
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Int)
  ownerId: number;

  @Field(() => [PetCategoryInput])
  petCategories: PetCategoryInput[];
}
