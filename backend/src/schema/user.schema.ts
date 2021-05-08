import { ObjectType, ID, Field } from 'type-graphql'

@ObjectType()
class User {
    @Field(type => ID)
    id: number;

    @Field()
    google_id: number
    
    @Field({ nullable: false })
    email: string;

    @Field({ nullable: false })
    name: string

    @Field({ nullable: true })
    account_ballance: number

    @Field({ nullable: true })
    address: string

}

export default User