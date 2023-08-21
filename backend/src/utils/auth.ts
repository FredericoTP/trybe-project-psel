import jwt = require('jsonwebtoken');
import { SignOptions, JwtPayload } from 'jsonwebtoken';
import { JwtObject, JwtInterface } from '../interfaces';

class JwtToken implements JwtInterface {
  private secretKey: string;

  private configJwt: SignOptions;

  constructor() {
    this.secretKey = process.env.JWT_SECRET || 'secret';
    this.configJwt = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
  }

  generateToken(payload: JwtObject): string {
    const token = jwt.sign(payload, this.secretKey, this.configJwt);

    return token;
  }

  validateToken(token: string): string | JwtPayload {
    const isValid = jwt.verify(token, this.secretKey);

    return isValid;
  }
}

export default JwtToken;
