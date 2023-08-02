import { ModelStatic, literal } from 'sequelize';
import TransactionModel from '../database/models/TransactionModel';
import AccountModel from '../database/models/AccountModel';
import { ITransactionInfo, ITransactionService } from '../interfaces';
import generateId from '../utils/generateTransactionId';
import { validateTransaction } from './validations/validationInputValues';

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

  public async create(transactionInfo: ITransactionInfo): Promise<string> {
    const { id, value, date } = transactionInfo;

    validateTransaction(transactionInfo);

    const transactionId = generateId();

    await this.transactionModel.create({
      transactionId, accountId: id, date, value, cashback: 0.00,
    });

    return transactionId;
  }
}

export default TransactionService;
