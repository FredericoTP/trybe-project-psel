import { Request, Response } from 'express';
import TransactionModel from '../database/models/TransactionModel';

interface ITransactionService {
  findByAccountId(id: number): Promise<TransactionModel[]>
  create(transactionInfo: ITransactionInfo): Promise<string>
  addCashbackRate(transactionInfo: ICashback): Promise<void>
}

interface ITransactionController {
  findByAccountId(req: Request, res: Response): Promise<Response>
  create(req: Request, res: Response): Promise<Response>
}

interface ITransactionInfo {
  document: string;
  value: number;
  date: string;
}

interface IBodyTransaction {
  value: number;
  date: string;
  document: string;
  infoToken: {
    id: number;
    name: string;
    email: string;
  }
}

interface ICashback {
  cashback: number;
  transactionId: string;
}

export {
  ITransactionService, ITransactionController, ITransactionInfo, IBodyTransaction, ICashback,
};
