import { ModelStatic, literal } from 'sequelize';
import TransactionModel from '../database/models/TransactionModel';
import { ITransactionService } from '../interfaces';
import AccountModel from '../database/models/AccountModel';

class TransactionService implements ITransactionService {
  private transactionModel: ModelStatic<TransactionModel> = TransactionModel;

  public async findByAccountId(id: number): Promise<TransactionModel[]> {
    const transactions = this.transactionModel.findAll(
      {
        where: { accountId: id },
        include: [
          {
            model: AccountModel,
            as: 'account',
            attributes: [],
          },
        ],
        attributes: [
          'transactionId',
          [literal('account.document'), 'document'],
          'date',
          'value',
          'cashback',
        ],
      },
    );

    return transactions;
  }
}

export default TransactionService;
