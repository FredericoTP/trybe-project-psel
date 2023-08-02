import { Request, Response } from 'express';
import TransactionModel from '../database/models/TransactionModel';

interface ITransactionService {
  findByAccountId(id: number): Promise<TransactionModel[]>
  create(transactionInfo: ITransactionInfo): Promise<string>
}

interface ITransactionController {
  findByAccountId(req: Request, res: Response): Promise<Response>
  create(req: Request, res: Response): Promise<Response>
}

interface ITransactionInfo {
  id: number;
  value: number;
  date: string;
}

interface IBodyTransaction {
  value: number;
  date: string;
  infoToken: {
    id: number;
    name: string;
    email: string;
  }
}

export {
  ITransactionService, ITransactionController, ITransactionInfo, IBodyTransaction,
};