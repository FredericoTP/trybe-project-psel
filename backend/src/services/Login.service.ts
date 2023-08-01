import { ModelStatic, Op } from 'sequelize';
import AccountModel from '../database/models/AccountModel';
import { AccountInfo, ILoginService } from '../interfaces';
import JwtToken from '../utils/auth';
import { Unauthorized } from '../utils/errors';
import { validateLogin } from './validations/validationInputValues';

const auth = new JwtToken();

class LoginService implements ILoginService {
  private accountModel: ModelStatic<AccountModel> = AccountModel;

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

    if (!account) throw new Unauthorized('Invalid email or password');

    const { name, email } = account.dataValues;

    const token = auth.generateToken({ name, email });

    return token;
  }
}

export default LoginService;
