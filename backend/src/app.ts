import express, { Response, Request, NextFunction } from 'express';
import { BadRequest, Unauthorized } from './utils/errors';
import { loginRouter, accountRouter } from './routers';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => res.status(200).send('Server on and healthy!'));

app.use('/login', loginRouter);

app.use('/account', accountRouter);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof BadRequest) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof Unauthorized) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'internal server error' });
});

export default app;
