import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Product {
  @Field()
  public readonly id: string

  @Field()
  public name: string

  @Field()
  public image: string

  @Field()
  public price: number
}
