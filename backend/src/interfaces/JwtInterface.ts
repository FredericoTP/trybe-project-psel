import { JwtPayload } from 'jsonwebtoken';

interface JwtInterface {
  generateToken(payload: JwtObject): string;
  validateToken(token: string) : string | JwtPayload;
}

interface JwtObject {
  name: string;
  email: string;
}

export { JwtObject, JwtInterface };
