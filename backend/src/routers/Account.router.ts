import 'express-async-errors';
import { Router } from 'express';
import { AccountController } from '../controllers';
import { AccountService } from '../services';
import { validateCreateAccount } from '../middlewares';

const accountRouter = Router();
const accountService = new AccountService();
const accountController = new AccountController(accountService);

accountRouter.post('/', validateCreateAccount, (req, res) => accountController.create(req, res));

export default accountRouter;
