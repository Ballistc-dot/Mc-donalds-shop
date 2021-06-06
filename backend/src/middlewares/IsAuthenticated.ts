import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import AuthContext from '../config/AuthContext'
import authConfig from '../config/auth'

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
  } catch (error) {
    throw new Error('not authorized!')
  }
  return next()
}
