import { Response, Request } from 'express';
import { AccountInfo } from './AccountInterface';

interface ILoginService {
  login(accountInfo: AccountInfo): Promise<string>
}

interface ILoginController {
  login(req: Request, res: Response): Promise<Response>
}

export { ILoginService, ILoginController };
