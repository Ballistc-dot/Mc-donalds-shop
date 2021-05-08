import { ObjectType, ID, Field } from 'type-graphql'

@ObjectType()
class Product {
  @Field(type => ID)
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  value: string;

  @Field()
  image: string;

}

export default Product