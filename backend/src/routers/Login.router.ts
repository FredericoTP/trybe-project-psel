import 'express-async-errors';
import { Response, Request, Router } from 'express';
import { LoginController } from '../controllers';
import { LoginService } from '../services';
import { validateLogin } from '../middlewares';
import JwtToken from '../utils/auth';

const loginRouter = Router();
const jwtToken = new JwtToken();
const loginService = new LoginService(jwtToken);
const loginController = new LoginController(loginService);

loginRouter.post('/', validateLogin, (req: Request, res: Response) => loginController.login(req, res));

export default loginRouter;
