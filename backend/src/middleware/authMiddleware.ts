import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { statusCode } from '../utils/statusCode';
import variables from '../../config/variables';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res
      .status(statusCode.UNAUTHORIZED)
      .json({ message: 'Acesso não autorizado. Token não fornecido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, variables.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(statusCode.UNAUTHORIZED).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;
