// @ts-ignore
import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { TransactionService } from '../../services';
import { TransactionController } from '../../controllers';
import {
  accountTransactions, cashback, mockToken, validAccount,
} from './mocks/mockTransaction';
import TransactionModel from '../../database/models/TransactionModel';

chai.use(sinonChai);

const { expect } = chai;

describe('TransactionController', () => {
  let transactionController: TransactionController;
  let transactionService: TransactionService;
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
    transactionService = new TransactionService();
    transactionController = new TransactionController(transactionService);
  });

  describe('Testing findByAccountId method', () => {
    it('Successfully returns an account', async () => {
      req.body = mockToken;
      sinon.stub(transactionService, 'findByAccountId').resolves(accountTransactions as TransactionModel[]);

      await transactionController.findByAccountId(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(accountTransactions);
    });
  });

  describe('Testing create method', () => {
    it('Successfully creates a transaction', async () => {
      req.body = validAccount;
      sinon.stub(transactionService, 'create').resolves('123456');

      await transactionController.create(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ transactionId: '123456' });
    });
  });

  describe('Testing addCashbackRate method', () => {
    it('Successfully updated the cashback', async () => {
      req.body = cashback;
      sinon.stub(transactionService, 'addCashbackRate').resolves();

      await transactionController.addCashbackRate(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Cashback has been updated' });
    });
  });
});
