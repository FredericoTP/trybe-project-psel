import AccountModel from '../database/models/AccountModel';
import { AccountInfo } from '../interfaces';
import JwtToken from '../utils/auth';
import { Unauthorized } from '../utils/errors';
import { validateLogin } from './validations/validationInputValues';

const auth = new JwtToken();

class LoginService {
  public static async login(accountInfo: AccountInfo): Promise<string> {
    const { document, password } = accountInfo;

    validateLogin(accountInfo);

    const account = await AccountModel.findOne({
      where: { document },
    });

    if (!account) throw new Unauthorized('Invalid email or password');

    if (account.password !== password) throw new Unauthorized('Invalid email or password');

    const token = auth.generateToken({ name: account.name, email: account.email });

    return token;
  }
}

export default LoginService;
