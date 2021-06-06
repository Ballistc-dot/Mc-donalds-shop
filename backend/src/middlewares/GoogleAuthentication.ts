import { MiddlewareFn } from 'type-graphql'
import AuthContext from '../config/AuthContext'
import { OAuth2Client } from 'google-auth-library'



const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

export const GoogleAuthentication: MiddlewareFn<AuthContext> = async (
  { args, context },
  next
) => {
  const Accesstoken = context.req.headers['authorization']

  if (!Accesstoken) throw new Error('id token must be provided!')

  const token = Accesstoken.toString().split(' ')[1]

  const tokenInfo = await client.getTokenInfo(token).catch((err) => {
    throw new Error('Invalid token!')
  })

  context.email = tokenInfo.email

  return next()
}
