import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PetCategoryInput {
  @Field(() => Int)
  id: number;
}
