import { ObjectType, ID, Field } from 'type-graphql'
import User from '../schema/user.schema'


@ObjectType()
class Auth {
    @Field()
    token: string

    @Field()
    user: User
}

export default Auth