import AccountModel from '../database/models/AccountModel';
import { AccountInfo } from '../interfaces';

class AccountService {
  private accountModel;

  constructor() {
    this.accountModel = AccountModel;
  }

  public async getByDocument(accountInfo: AccountInfo) {
    const { document } = accountInfo;

    const account = await this.accountModel.findOne({
      where: { document },
    });

    if (!account) throw new Error('');

    return account;
  }
}

export default AccountService;
