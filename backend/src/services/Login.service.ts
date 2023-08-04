import { ModelStatic, Op } from 'sequelize';
import AccountModel from '../database/models/AccountModel';
import { AccountInfo, ILoginService } from '../interfaces';
import JwtToken from '../utils/auth';
import { Unauthorized } from '../utils/errors';
import { validateLogin } from './validations/validationInputValues';

class LoginService implements ILoginService {
  private accountModel: ModelStatic<AccountModel> = AccountModel;

  constructor(private auth: JwtToken) {}

  public async login(accountInfo: AccountInfo): Promise<string> {
    const { document, password } = accountInfo;

    validateLogin(accountInfo);

    const account = await this.accountModel.findOne(
      {
        where: {
          [Op.and]: [{ password }, { document }],
        },
      },
    );

    if (!account) throw new Unauthorized('Invalid document or password');

    if (!account.dataValues.status) throw new Unauthorized('Invalid document or password');

    const { id, name, email } = account.dataValues;

    const token = this.auth.generateToken({ id, name, email });

    return token;
  }
}

export default LoginService;
