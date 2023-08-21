// @ts-ignore
import chai = require('chai');
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import jwt = require('jsonwebtoken');
import app from '../../app';
import { jwtValid } from './mocks/accountMocks';
import TransactionModel from '../../database/models/TransactionModel';
import {
  activeAcc, createdTransaction, deactivatedAcc, findAllReturn, validBody, validCashback,
} from './mocks/transactionMocks';
import AccountModel from '../../database/models/AccountModel';
import * as generateIdModule from '../../utils/generateTransactionId';

chai.use(chaiHttp);

const { expect } = chai;

describe('Transaction router', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('GET /transaction', () => {
    describe('Call without token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).get('/transaction');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).get('/transaction').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Successfully returns all transactions by account id', () => {
      it('Should return 200 and transactions', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(TransactionModel, 'findAll').resolves(findAllReturn as TransactionModel[]);

        const response = await chai.request(app).get('/transaction')
          .set('Authorization', 'valid-token');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(findAllReturn);
      });
    });
  });

  describe('POST /transaction', () => {
    describe('Call without token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).post('/transaction');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).post('/transaction').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Call without parameters in body', () => {
      it('Without value should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).post('/transaction')
          .set('Authorization', 'valid-token')
          .send({ document: validBody.document, date: validBody.date });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Value is a required field' });
      });

      it('Without document should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).post('/transaction')
          .set('Authorization', 'valid-token')
          .send({ value: validBody.value, date: validBody.date });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Document is a required field' });
      });

      it('Without date should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).post('/transaction')
          .set('Authorization', 'valid-token')
          .send({ value: validBody.value, document: validBody.document });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Date is a required field' });
      });
    });

    describe('Call with account that does not exist', () => {
      it('Should return 404 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(AccountModel, 'findOne').resolves(null);

        const response = await chai.request(app).post('/transaction')
          .set('Authorization', 'valid-token')
          .send(validBody);

        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'Account does not exist' });
      });
    });

    describe('Call with account that is deactivated', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(AccountModel, 'findOne').resolves(deactivatedAcc as AccountModel);

        const response = await chai.request(app).post('/transaction')
          .set('Authorization', 'valid-token')
          .send(validBody);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Account deactivated' });
      });
    });

    describe('Successfully creates a transaction', () => {
      it('Should return 200 and a transactionId', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(AccountModel, 'findOne').resolves(activeAcc as AccountModel);
        const idMock = sinon.stub(generateIdModule, 'default').returns('123456');
        sinon.stub(TransactionModel, 'create').resolves(createdTransaction as TransactionModel);

        const response = await chai.request(app).post('/transaction')
          .set('Authorization', 'valid-token')
          .send(validBody);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ transactionId: idMock() });
      });
    });
  });

  describe('PATCH /transaction', () => {
    describe('Call without token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).patch('/transaction');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).patch('/transaction').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Call without parameters in body', () => {
      it('Without transationId should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).patch('/transaction')
          .set('Authorization', 'valid-token')
          .send({ cashback: validCashback.cashback });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'transactionId is a required field' });
      });

      it('Without cashback should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).patch('/transaction')
          .set('Authorization', 'valid-token')
          .send({ transactionId: validCashback.transactionId });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Cashback is a required field' });
      });
    });

    describe('Call with transactionId that does not exists', () => {
      it('Should return 404 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(TransactionModel, 'findOne').resolves(null);

        const response = await chai.request(app).patch('/transaction')
          .set('Authorization', 'valid-token')
          .send(validCashback);

        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'Transaction does not exist' });
      });
    });

    describe('Call with accountId that does not exists', () => {
      it('Should return 404 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(TransactionModel, 'findOne').resolves(createdTransaction as TransactionModel);
        sinon.stub(AccountModel, 'findOne').resolves(null);

        const response = await chai.request(app).patch('/transaction')
          .set('Authorization', 'valid-token')
          .send(validCashback);

        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'Account does not exist' });
      });
    });

    describe('Call with account that is deactivated', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(TransactionModel, 'findOne').resolves(createdTransaction as TransactionModel);
        sinon.stub(AccountModel, 'findOne').resolves(deactivatedAcc as AccountModel);

        const response = await chai.request(app).patch('/transaction')
          .set('Authorization', 'valid-token')
          .send(validCashback);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Account deactivated' });
      });
    });

    describe('Successfully updates cashback', () => {
      it('Should return 200 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(TransactionModel, 'findOne').resolves(createdTransaction as TransactionModel);
        sinon.stub(AccountModel, 'findOne').resolves(activeAcc as AccountModel);
        sinon.stub(TransactionModel, 'update').resolves();

        const response = await chai.request(app).patch('/transaction')
          .set('Authorization', 'valid-token')
          .send(validCashback);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Cashback has been updated' });
      });
    });
  });
});
