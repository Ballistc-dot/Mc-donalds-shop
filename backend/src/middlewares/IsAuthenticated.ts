import jwtDecode from 'jwt-decode'
import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import AuthContext from '../config/AuthContext'
import authConfig from '../config/auth'

type JwtContext = {
  sub: string
}

export const isAuthenticated: MiddlewareFn<AuthContext> = (
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
    const payload = jwtDecode<JwtContext>(token)
    context.uid = payload.sub
  } catch (error) {
    throw new Error('not authorized!')
  }
  return next()
}
