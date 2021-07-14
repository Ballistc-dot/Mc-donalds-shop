import { ObjectType, ID, Field } from 'type-graphql'
import User from './user.schema'

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

export default Adreess
