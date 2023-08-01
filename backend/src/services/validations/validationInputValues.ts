import { loginSchema, accountSchema } from './schemas';
import { AccountInfo, IAccount } from '../../interfaces';
import { BadRequest } from '../../utils/errors';

const validateLogin = (accountInfo: AccountInfo): void => {
  const { error } = loginSchema.validate(accountInfo);

  if (error) throw new BadRequest(error.message);
};

const validateNewAccount = (accountInfo: IAccount): void => {
  const { error } = accountSchema.validate(accountInfo);

  if (error) throw new BadRequest(error.message);
};

export { validateLogin, validateNewAccount };
