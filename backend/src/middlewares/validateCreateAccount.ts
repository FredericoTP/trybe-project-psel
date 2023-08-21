import { Request, Response, NextFunction } from 'express';

const validateCreateAccount = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, email, document, password,
  } = req.body;

  if (!name) return res.status(400).json({ message: 'Name is a required field' });

  if (!email) return res.status(400).json({ message: 'Email is a required field' });

  if (!document) return res.status(400).json({ message: 'Document is a required field' });

  if (!password) return res.status(400).json({ message: 'Password is a required field' });

  return next();
};

export default validateCreateAccount;
