import { loginSchema } from './schemas';
import { AccountInfo } from '../../interfaces';
import { BadRequest } from '../../utils/errors';

const validateLogin = (accountInfo: AccountInfo) => {
  const { error } = loginSchema.validate(accountInfo);

  if (error) throw new BadRequest(error.message);
};

export { validateLogin };
