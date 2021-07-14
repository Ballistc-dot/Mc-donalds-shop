import { ObjectType, ID, Field } from 'type-graphql'
@ObjectType()
class User {
  @Field((type) => ID)
  id: number

  @Field()
  uid: string

  @Field({ nullable: false })
  email: string

  @Field({ nullable: false })
  name: string

  @Field({ nullable: true })
  account_ballance: number

  @Field((type) => [Adreess!])
  address: Adreess[]
}

// find anyway to import this from schema, the graphql don't recoinze the ObjectType Class
@ObjectType()
class Adreess {
  @Field((type) => ID)
  id: number

  @Field({ nullable: false })
  street: string

  @Field({ nullable: false })
  province: string

  @Field({ nullable: false })
  neighborhood: string

  @Field({ nullable: false })
  number: number

  @Field()
  user: User

  @Field()
  uid: string
}

export default User
