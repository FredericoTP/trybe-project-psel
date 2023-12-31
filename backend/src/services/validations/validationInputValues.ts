import {
  idSchema,
  loginSchema,
  accountSchema,
  cpfSchema,
  cnpjSchema,
  updateSchema,
  transactionSchema,
} from './schemas';
import {
  AccountInfo, IAccount, IAccountUpdate, ITransactionInfo,
} from '../../interfaces';
import { BadRequest } from '../../utils/errors';

const validateLogin = (accountInfo: AccountInfo): void => {
  const { error } = loginSchema.validate(accountInfo);

  if (error) throw new BadRequest(error.message);
};

const validateNewAccount = (accountInfo: IAccount): void => {
  const { error } = accountSchema.validate(accountInfo);

  if (error) throw new BadRequest(error.message);
};

const validateCpfCnpj = (document: string): void => {
  if (document.length <= 14) {
    const { error } = cpfSchema.validate(document);

    if (error) throw new BadRequest(error.message);
  }

  if (document.length > 14) {
    const { error } = cnpjSchema.validate(document);

    if (error) throw new BadRequest(error.message);
  }
};

const validateUpdate = (accountInfo: IAccountUpdate): void => {
  const { error } = updateSchema.validate(accountInfo);

  if (error) throw new BadRequest(error.message);
};

const validateTransaction = (transactionInfo: ITransactionInfo): void => {
  const { error } = transactionSchema.validate(transactionInfo);

  if (error) throw new BadRequest(error.message);
};

const validateId = (id: number): void => {
  const { error } = idSchema.validate(id);

  if (error) throw new BadRequest(error.message);
};

export {
  validateLogin,
  validateNewAccount,
  validateCpfCnpj,
  validateUpdate,
  validateTransaction,
  validateId,
};
