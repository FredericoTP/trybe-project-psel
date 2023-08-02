import { Request, Response } from 'express';
import TransactionModel from '../database/models/TransactionModel';

interface ITransactionService {
  findByAccountId(id: number): Promise<TransactionModel[]>
}

interface ITransactionController {
  findByAccountId(req: Request, res: Response): Promise<Response>
}

export { ITransactionService, ITransactionController };
