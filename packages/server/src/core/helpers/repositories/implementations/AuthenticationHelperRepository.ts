import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { jwt } from '../../../config/jwtConfig'
import { IAutheticationJWT } from '../IAutheticationHelper'

interface DecodedData {
  payload: string
  email: string
}

export class AutheticationJWTRepository implements IAutheticationJWT {
  constructor() {}
  verifyToken(token: string): JwtPayload {
    const decoded = verify(
      token,
      jwt.secret,
      (_, decoded): JwtPayload => decoded as JwtPayload
    )

    return decoded as unknown as JwtPayload
  }
  signToken(email: string, id?: string): string {
    const decoded = sign(
      {
        email
      },
      jwt.secret,
      {
        subject: `${id}`,
        expiresIn: jwt.expiresIn
      }
    )

    return decoded
  }
}
