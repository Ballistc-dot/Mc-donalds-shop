import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  public readonly id: string

  @Field()
  public name: string

  @Field()
  public email: string
}
@ObjectType()
export class CreateUserResponse {
  @Field()
  public user: User

  @Field()
  public AccessToken: string
}
