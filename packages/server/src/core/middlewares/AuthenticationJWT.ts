//import { MiddlewareFn } from 'type-graphql'
//import { verify, decode } from 'jsonwebtoken'
//import AuthContext from '../config/AuthContext'
//import authConfig from '../config/auth'

import { Request, Response } from 'express'
import { NextFn, ResolverData } from 'type-graphql'
import { signAndVerifyTokens } from '../helpers/signAndVerifyTokens'

type JwtContext = {
  sub: string
}
interface AuthContext {
  req: Request
  res: Response
  email: string
  name: string
  uid: string
}

export class AutheticationJWT {
  constructor() {}
  async handle({ context }: ResolverData<AuthContext>, next: NextFn) {
    const auth = context.req.headers['authorization']

    if (!auth) throw new Error('Token must be provided')

    const token = auth.split(' ')[1]
    const isValidToken = signAndVerifyTokens.verify(token)

    if (!isValidToken) throw new Error('Token is invalid')

    next()
  }

  /*async verifyToken(
    { context }: ResolverData<AuthContext>,
    next: NextFn
  ): Promise<any> {
    context.req.body.email
    if (context.req.headers['authorization']) {
    }
    return next()
  }
  async getGoogleTokenData(
    { context }: ResolverData<AuthContext>,
    next: NextFn
  ) {
    const auth = context.req.headers['authorization']

    console.log('herer', context.req)
    if (!auth) throw new Error('Token must be provided')
    const token = auth.split(' ')[1]
    context.email = '3rrwea@hahah.com'
    context.name = 'sdjasdadasd'
    return next()
  }*/
}

//export const autheticationJWT = new AutheticationJWT()

/*export const isAuthenticated: MiddlewareFn<AuthContext> = (
  { context },
  next
) => {
  const auth = context.req.headers['authorization']

  if (!auth) {
    throw new Error('Auth token must be provided!')
  }

  try {
    const token = auth.split(' ')[1]
    verify(token, authConfig.jwt.secret)
    const payload = decode(token)
    context.uid = payload?.sub
  } catch (error) {
    throw new Error('not authorized!')
  }
  return next()
}
*/
