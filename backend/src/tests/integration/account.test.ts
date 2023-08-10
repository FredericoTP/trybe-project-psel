// @ts-ignore
import chai = require('chai');
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
import app from '../../app';
import AccountModel from '../../database/models/AccountModel';
import {
  invalidCnpj,
  invalidCpf,
  jwtValid,
  validDocument,
  withouPassword, withoutDocument, withoutEmail, withoutName,
} from './mocks/accountMocks';
import { returnFindOne } from './mocks/loginMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Account Router', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('POST /account', () => {
    describe('Call without name', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/account').send(withoutName);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Name is a required field' });
      });
    });

    describe('Call without password', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/account').send(withouPassword);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Password is a required field' });
      });
    });

    describe('Call without document', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/account').send(withoutDocument);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Document is a required field' });
      });
    });

    describe('Call without email', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/account').send(withoutEmail);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Email is a required field' });
      });
    });

    describe('Call with invalid document', () => {
      it('Should return 400 and a message with cpf', async () => {
        const response = await chai.request(app).post('/account').send(invalidCpf);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'CPF inválido' });
      });

      it('Should return 400 and a message with cnpj', async () => {
        const response = await chai.request(app).post('/account').send(invalidCnpj);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'CNPJ inválido' });
      });
    });

    describe('Call with account that already exists', () => {
      it('Should return 409 and a message', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(returnFindOne as AccountModel);

        const response = await chai.request(app).post('/account').send(validDocument);

        expect(response.status).to.be.equal(409);
        expect(response.body).to.be.deep.equal({ message: 'Account already exists' });
      });
    });

    describe('Successfully creates an account', () => {
      it('Should return 200 and account', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(null);
        sinon.stub(bcrypt, 'hashSync').resolves('123456');
        sinon.stub(AccountModel, 'create').resolves(validDocument as AccountModel);

        const response = await chai.request(app).post('/account').send(validDocument);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(validDocument);
      });
    });
  });

  describe('PATCH /account', () => {
    describe('Call without token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).patch('/account');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).patch('/account').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Call without name', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).patch('/account')
          .set('Authorization', 'valid-token')
          .send({ email: validDocument.email });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Name is a required field' });
      });
    });

    describe('Call without email', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).patch('/account')
          .set('Authorization', 'valid-token')
          .send({ name: validDocument.name });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Email is a required field' });
      });
    });

    describe('Successfully updates an account', () => {
      it('Should return 200 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(AccountModel, 'findOne').resolves(returnFindOne as AccountModel);
        sinon.stub(AccountModel, 'update').resolves();

        const response = await chai.request(app).patch('/account')
          .set('Authorization', 'valid-token')
          .send({ name: validDocument.name, email: validDocument.email });

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Account has been updated' });
      });
    });
  });

  describe('PATCH /account/delete', () => {
    describe('Call without token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).patch('/account/delete');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).patch('/account/delete').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Successfully deletes an account', () => {
      it('Should return 200 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(AccountModel, 'update').resolves();

        const response = await chai.request(app).patch('/account/delete')
          .set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Account has been deleted' });
      });
    });
  });
});
