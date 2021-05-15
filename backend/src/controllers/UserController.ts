import { Query, Resolver, Arg, Mutation, Args, ArgsType, Field, Int } from 'type-graphql'
import User from '../schema/user.schema'
import prisma from '../utils/PrismaConnection'
import { decode, sign } from 'jsonwebtoken'
import AuthConfig from '../config/auth'
import Auth from '../schema/auth.schema'
import Product from '../schema/product.schema'

@ArgsType()
class UserArgs {
    @Field(type => String)
    name: string
    @Field(type => String)
    email: string
    @Field(type => String)
    googleToken: string

}

@Resolver(User)
class UserController {
    @Mutation(returns => Auth)
    async createUserToken(@Arg("email") email: string) {
        const storagedUser = await prisma.user.findMany({
            where: {
                email
            }
        })
        if (storagedUser.length) {
            const { secret, expiresIn } = AuthConfig.jwt
            const userId = storagedUser[0].google_id

            const token = sign({}, secret, {
                subject: `${userId}`,
                expiresIn
            })
            return {
                token,
                user: storagedUser[0]
            }
        } else {
            throw new Error("You may register")
        }
    }
    @Mutation(returns => User)
    async createUser(@Args() { email, name, googleToken }: UserArgs) {
        const googleId = decode(googleToken).sub
        const storagedUser = await prisma.user.findMany({
            where: {
                email
            }
        })
        if (storagedUser.length) {
            return storagedUser[0]
        }
        const user = await prisma.user.create({
            data: {
                google_id: googleId,
                email,
                name,
            }
        })

        return {
            user
        }
    }
}

export default UserController