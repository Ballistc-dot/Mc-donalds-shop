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

            const token = sign({}, secret, {
                subject: `${email}`,
                expiresIn
            })
            return {
                token,
                user: storagedUser[0]
            }
        } else {
            throw new Error("you may register")
        }
    }
    @Mutation(returns => User)
    async createUser(@Args() { email, name, googleToken }: UserArgs) {
        console.log("aaaaaaaaaaaaaa")
        const googleId = decode(googleToken).sub
        console.log(email, name)
        const storagedUser = await prisma.user.findMany({
            where: {
                email
            }
        })
        if (storagedUser.length) {
            console.log(storagedUser)
            console.log(storagedUser[0])
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