import { Request, Response, NextFunction } from 'express';

const validateUpdateAccount = (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;

  if (!name) return res.status(400).json({ message: 'Name is a required field' });

  if (!email) return res.status(400).json({ message: 'Email is a required field' });

  return next();
};

export default validateUpdateAccount;
