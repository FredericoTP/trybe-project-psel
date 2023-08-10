// @ts-ignore
import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import bcrypt = require('bcryptjs');
import AccountModel from '../../database/models/AccountModel';
import { LoginService } from '../../services';
import {
  emptyLogin, infoLogin, invalidLogin, validLogin,
} from './mocks/mockLogin';
import { BadRequest, Unauthorized } from '../../utils/errors';
import JwtToken from '../../utils/auth';

chai.use(sinonChai);

const { expect } = chai;

describe('LoginService', () => {
  let loginService: LoginService;

  beforeEach(() => {
    sinon.restore();
    const jwtToken = new JwtToken();
    loginService = new LoginService(jwtToken);
  });

  describe('Testing login method', () => {
    it('Should throw an error when a field is empty', async () => {
      let error = new Error();

      try {
        await loginService.login(emptyLogin);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('document cannot be an empty field');
    });

    it('Should throw an error when document is wrong', async () => {
      let error = new Error();
      sinon.stub(AccountModel, 'findOne').resolves(null);

      try {
        await loginService.login(infoLogin);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Unauthorized);
      expect(error.message).to.be.equal('Invalid document or password');
    });

    it('Should throw an error when password is wrong', async () => {
      let error = new Error();
      sinon.stub(AccountModel, 'findOne').resolves(validLogin as AccountModel);
      sinon.stub(bcrypt, 'compareSync').returns(false);

      try {
        await loginService.login(infoLogin);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Unauthorized);
      expect(error.message).to.be.equal('Invalid document or password');
    });

    it('Should throw an error when account status is 0', async () => {
      let error = new Error();
      sinon.stub(AccountModel, 'findOne').resolves(invalidLogin as AccountModel);
      sinon.stub(bcrypt, 'compareSync').resolves(true);

      try {
        await loginService.login(infoLogin);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Unauthorized);
      expect(error.message).to.be.equal('Invalid document or password');
    });

    it('Successfully login and returns a token', async () => {
      const jwtToken = new JwtToken();
      loginService = new LoginService(jwtToken);
      sinon.stub(AccountModel, 'findOne').resolves(validLogin as AccountModel);
      sinon.stub(bcrypt, 'compareSync').resolves(true);
      sinon.stub(jwtToken, 'generateToken').callsFake(() => 'abc');

      const token = await loginService.login(infoLogin);

      expect(token).to.be.equal('abc');
    });
  });
});
