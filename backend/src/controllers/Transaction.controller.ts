import { Request, Response } from 'express';
import { TransactionService } from '../services';
import { IBodyTransaction, ITransactionController } from '../interfaces';

class TransactionController implements ITransactionController {
  constructor(private transactionService: TransactionService) {}

  public async findByAccountId(req: Request, res: Response): Promise<Response> {
    const { infoToken } = req.body;

    const transactions = await this.transactionService.findByAccountId(infoToken.id);

    return res.status(200).json(transactions);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const info: IBodyTransaction = req.body;

    const toCreate = {
      id: info.infoToken.id,
      value: Number(info.value.toFixed(2)),
      date: info.date,
    };

    const transactionId = await this.transactionService.create(toCreate);

    return res.status(200).json({ transactionId });
  }
}

export default TransactionController;
