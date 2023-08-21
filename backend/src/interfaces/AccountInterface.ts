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
  findById(id: number): Promise<AccountModel>
  update(accountInfo: IAccountUpdate): Promise<void>
  delete(id: number): Promise<void>
}

interface IAccountController {
  create(req: Request, res: Response): Promise<Response>
  update(req: Request, res: Response): Promise<Response>
  delete(req: Request, res: Response): Promise<Response>
}

interface IBodyAccount {
  name: string;
  email: string;
  infoToken: {
    id: number;
    name: string;
    email: string;
  }
}

interface IAccountUpdate {
  id: number;
  name: string;
  email: string;
}

export {
  AccountInfo, IAccount, IAccountService, IAccountController, IBodyAccount, IAccountUpdate,
};
