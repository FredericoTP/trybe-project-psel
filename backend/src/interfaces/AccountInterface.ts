import { Request, Response } from 'express';
import AccountModel from '../database/models/AccountModel';

interface AccountInfo {
  document: string;
  password: string;
}

interface IAccount {
  name: string;
  password: string;
  email: string;
  document: string;
}

interface IAccountService {
  create(accountInfo: IAccount): Promise<AccountModel>
}

interface IAccountController {
  create(req: Request, res: Response): Promise<Response>
}

export {
  AccountInfo, IAccount, IAccountService, IAccountController,
};
