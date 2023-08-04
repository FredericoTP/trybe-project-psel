// @ts-ignore
import chai = require('chai');
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import jwt = require('jsonwebtoken');
import app from '../../app';
import { loginInfo, returnFindOne, returnFindOneDel } from './mocks/loginMocks';
import AccountModel from '../../database/models/AccountModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Router', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('POST /login', () => {
    describe('Call without document', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/login').send({
          password: loginInfo.password,
        });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Document is a required field' });
      });
    });

    describe('Call without password', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/login').send({
          document: loginInfo.document,
        });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Password is a required field' });
      });
    });

    describe('Call with wrong document or password', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(null);

        const response = await chai.request(app).post('/login').send(loginInfo);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Invalid document or password' });
      });
    });

    describe('Call account with status 0', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(returnFindOneDel as AccountModel);

        const response = await chai.request(app).post('/login').send(loginInfo);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Invalid document or password' });
      });
    });

    describe('Calls the account correctly', () => {
      it('Should return 200 and a token', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(returnFindOne as AccountModel);
        sinon.stub(jwt, 'sign').callsFake(() => 'abc');

        const response = await chai.request(app).post('/login').send(loginInfo);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ token: 'abc' });
      });
    });
  });
});
