import { Request, Response, NextFunction } from 'express';

const validateCashback = (req: Request, res: Response, next: NextFunction) => {
  const {
    transactionId, cashback,
  } = req.body;

  if (!transactionId) return res.status(400).json({ message: 'transactionId is a required field' });

  if (!cashback) return res.status(400).json({ message: 'Cashback is a required field' });

  return next();
};

export default validateCashback;
