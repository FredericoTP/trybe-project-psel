import { Request, Response } from 'express';
import { TransactionService } from '../services';
import { ITransactionController } from '../interfaces';

class TransactionController implements ITransactionController {
  constructor(private transactionService: TransactionService) {}

  public async findByAccountId(req: Request, res: Response): Promise<Response> {
    const { infoToken } = req.body;

    const transactions = await this.transactionService.findByAccountId(infoToken.id);

    return res.status(200).json(transactions);
  }
}

export default TransactionController;
