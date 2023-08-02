import 'express-async-errors';
import { Response, Request, Router } from 'express';
import { TransactionService } from '../services';
import { TransactionController } from '../controllers';
import { validateToken } from '../middlewares';

const transactionRouter = Router();
const transactionService = new TransactionService();
const transactionController = new TransactionController(transactionService);

transactionRouter.get('/', validateToken, (req: Request, res: Response) => transactionController.findByAccountId(req, res));

export default transactionRouter;
