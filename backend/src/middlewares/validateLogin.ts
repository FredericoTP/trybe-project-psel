import { Request, Response, NextFunction } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { document, password } = req.body;

  if (!document) return res.status(400).json({ message: 'Document is a required field' });

  if (!password) return res.status(400).json({ message: 'Password is a required field' });

  return next();
};

export default validateLogin;
