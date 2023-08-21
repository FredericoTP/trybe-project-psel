import HttpError from './HttpError';

class Unauthorized extends HttpError {
  constructor(message: string) {
    const statusCode = 401;
    super(message, statusCode);
  }
}

export default Unauthorized;
