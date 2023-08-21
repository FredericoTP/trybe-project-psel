import { Request, Response } from 'express';
import {
  IAccountService, IAccount, IAccountController, IBodyAccount,
} from '../interfaces';

class AccountController implements IAccountController {
  constructor(private accountService: IAccountService) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const accountInfo: IAccount = req.body;

    const account = await this.accountService.create(accountInfo);

    return res.status(200).json(account);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const infos: IBodyAccount = req.body;

    const toUpdate = {
      id: infos.infoToken.id, name: infos.name, email: infos.email,
    };

    await this.accountService.update(toUpdate);

    return res.status(200).json({ message: 'Account has been updated' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { infoToken } = req.body;

    await this.accountService.delete(infoToken.id);

    return res.status(200).json({ message: 'Account has been deleted' });
  }
}

export default AccountController;
