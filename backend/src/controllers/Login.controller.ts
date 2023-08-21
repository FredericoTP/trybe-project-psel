import { Response, Request } from 'express';
import { ILoginService, ILoginController, AccountInfo } from '../interfaces';

class LoginController implements ILoginController {
  constructor(private loginService: ILoginService) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const loginInfo: AccountInfo = req.body;

    const token = await this.loginService.login(loginInfo);

    return res.status(200).json({ token });
  }
}

export default LoginController;
