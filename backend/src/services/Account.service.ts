import { ModelStatic } from 'sequelize';
import AccountModel from '../database/models/AccountModel';
import { IAccount, IAccountService } from '../interfaces';
import { validateNewAccount } from './validations/validationInputValues';

class AccountService implements IAccountService {
  public accountModel: ModelStatic<AccountModel> = AccountModel;

  public async create(accountInfo: IAccount): Promise<AccountModel> {
    const {
      name, password, email, document,
    } = accountInfo;

    validateNewAccount(accountInfo);

    const account = await this.accountModel.create({
      name, password, email, document, status: true,
    });

    return account;
  }
}

export default AccountService;
