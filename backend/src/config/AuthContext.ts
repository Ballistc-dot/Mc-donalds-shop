import { Request, Response } from 'express'


interface AuthContext {
    req: Request
    res: Response
}

export default AuthContext