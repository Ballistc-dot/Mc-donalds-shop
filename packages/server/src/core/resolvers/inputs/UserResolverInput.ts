import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class GoogleDataInput {
  @Field()
  email: string
  @Field()
  name: string
  @Field()
  oAuth: boolean
}

@ArgsType()
export class UserInput {
  @Field()
  email: string
  @Field()
  name: string
  @Field()
  password: string
}

@ArgsType()
export class AuthInput {
  @Field()
  email: string
  @Field()
  password: string
}
