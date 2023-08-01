import { Response, Request } from 'express';
import { LoginService } from '../services';

class LoginController {
  public static async login(req: Request, res: Response) {
    const loginInfo = req.body;

    const token = await LoginService.login(loginInfo);

    return res.status(200).json({ token });
  }
}

export default LoginController;
