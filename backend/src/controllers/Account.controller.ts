import { Request, Response } from 'express';
import { IAccountService, IAccount, IAccountController } from '../interfaces';

class AccountController implements IAccountController {
  constructor(private accountService: IAccountService) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const accountInfo: IAccount = req.body;

    const account = await this.accountService.create(accountInfo);

    return res.status(200).json(account);
  }
}

export default AccountController;
