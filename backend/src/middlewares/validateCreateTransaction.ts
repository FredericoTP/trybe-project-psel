import { Request, Response, NextFunction } from 'express';

const validateCreateTransaction = (req: Request, res: Response, next: NextFunction) => {
  const {
    value, document, date,
  } = req.body;

  if (!value) return res.status(400).json({ message: 'Value is a required field' });

  if (!document) return res.status(400).json({ message: 'Document is a required field' });

  if (!date) return res.status(400).json({ message: 'Date is a required field' });

  return next();
};

export default validateCreateTransaction;
