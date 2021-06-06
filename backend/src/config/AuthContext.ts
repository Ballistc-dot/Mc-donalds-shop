import { Request, Response } from 'express'

interface AuthContext {
  req: Request
  res: Response
  email: string
}

export default AuthContext
