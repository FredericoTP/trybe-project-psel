import { ModelStatic, Op } from 'sequelize';
import AccountModel from '../database/models/AccountModel';
import { IAccount, IAccountService, IAccountUpdate } from '../interfaces';
import { validateNewAccount, validateCpfCnpj, validateUpdate } from './validations/validationInputValues';
import { Conflict, NotFound } from '../utils/errors';

class AccountService implements IAccountService {
  private accountModel: ModelStatic<AccountModel> = AccountModel;

  public async create(accountInfo: IAccount): Promise<AccountModel> {
    const {
      name, password, email, document,
    } = accountInfo;

    validateNewAccount(accountInfo);
    validateCpfCnpj(accountInfo.document);

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

  public async findById(id: number): Promise<AccountModel> {
    const account = await this.accountModel.findOne(
      {
        where: { id },
      },
    );

    if (!account) throw new NotFound('Account does not exist');

    return account;
  }

  public async update(accountInfo: IAccountUpdate): Promise<void> {
    const { id, name, email } = accountInfo;

    validateUpdate(accountInfo);

    await this.findById(id);

    await this.accountModel.update(
      { name, email },
      { where: { id } },
    );
  }

  public async delete(id: number): Promise<void> {
    await this.accountModel.update(
      { status: 0 },
      { where: { id } },
    );
  }
}

export default AccountService;
