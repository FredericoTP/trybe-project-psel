import { ModelStatic, Op } from 'sequelize';
import AccountModel from '../database/models/AccountModel';
import { IAccount, IAccountService } from '../interfaces';
import { validateNewAccount } from './validations/validationInputValues';
import { Conflict } from '../utils/errors';

class AccountService implements IAccountService {
  private accountModel: ModelStatic<AccountModel> = AccountModel;

  public async create(accountInfo: IAccount): Promise<AccountModel> {
    const {
      name, password, email, document,
    } = accountInfo;

    validateNewAccount(accountInfo);

    const checkAccount = await this.accountModel.findOne(
      {
        where: {
          [Op.or]: [{ email }, { document }],
        },
      },
    );

    if (checkAccount) throw new Conflict('Account already exists');

    const account = await this.accountModel.create({
      name, password, email, document, status: 1,
    });

    return account;
  }
}

export default AccountService;
