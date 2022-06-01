import { JwtPayload } from 'jsonwebtoken'

export interface IAutheticationJWT {
  verifyToken(token: string): JwtPayload
  signToken(email: string, password: string): string
}
