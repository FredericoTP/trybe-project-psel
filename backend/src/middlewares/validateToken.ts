import { Request, Response, NextFunction } from 'express';
import JwtToken from '../utils/auth';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const jwtToken = new JwtToken();

    const infoToken = jwtToken.validateToken(authorization);

    req.body.infoToken = infoToken;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be valid' });
  }

  return '';
};

export default validateToken;
