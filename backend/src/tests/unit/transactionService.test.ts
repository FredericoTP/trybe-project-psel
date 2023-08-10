// @ts-ignore
import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import TransactionModel from '../../database/models/TransactionModel';
import { TransactionService } from '../../services';
import {
  accountTransactions,
  activateLogin,
  cashback,
  createdResult,
  deactivatedLogin,
  emptyParameter,
  invalidAccount,
  validAccount,
} from './mocks/mockTransaction';
import { BadRequest, NotFound, Unauthorized } from '../../utils/errors';
import AccountModel from '../../database/models/AccountModel';
import * as generateIdModule from '../../utils/generateTransactionId';

chai.use(sinonChai);

const { expect } = chai;

describe('TransactionService', () => {
  let transactionService: TransactionService;

  beforeEach(() => {
    transactionService = new TransactionService();
    sinon.restore();
  });

  describe('Testing findByAccountId method', () => {
    it('Should return all transactions for an account', async () => {
      sinon.stub(TransactionModel, 'findAll').resolves(accountTransactions as TransactionModel[]);

      const transactions = await transactionService.findByAccountId(1);

      expect(transactions).to.be.deep.equal(accountTransactions);
    });
  });

  describe('Testing create method', () => {
    it('Should throw an error when a field is empty', async () => {
      let error = new Error();

      try {
        await transactionService.create(emptyParameter);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('document cannot be an empty field');
    });

    it('Shoul throw an error when account does not exists', async () => {
      sinon.stub(AccountModel, 'findOne').resolves(null);
      let error = new Error();

      try {
        await transactionService.create(invalidAccount);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(NotFound);
      expect(error.message).to.be.equal('Account does not exist');
    });

    it('Should throw an error when account is deactivated', async () => {
      sinon.stub(AccountModel, 'findOne').resolves(deactivatedLogin as AccountModel);
      let error = new Error();

      try {
        await transactionService.create(validAccount);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Unauthorized);
      expect(error.message).to.be.equal('Account deactivated');
    });

    it('Successfully creates a transaction', async () => {
      sinon.stub(AccountModel, 'findOne').resolves(activateLogin as AccountModel);
      const idMock = sinon.stub(generateIdModule, 'default').returns('123456');
      sinon.stub(TransactionModel, 'create').resolves(createdResult as TransactionModel);

      const create = await transactionService.create(validAccount);

      expect(create).to.be.equal(idMock());
    });
  });

  describe('Testing addCashbackRate method', () => {
    it('Should throw an error when transactionId does not exist', async () => {
      sinon.stub(TransactionModel, 'findOne').resolves(null);
      let error = new Error();

      try {
        await transactionService.addCashbackRate(cashback);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(NotFound);
      expect(error.message).to.be.equal('Transaction does not exist');
    });

    it('Should throw an error if account does not exist', async () => {
      sinon.stub(TransactionModel, 'findOne').resolves(createdResult as TransactionModel);
      sinon.stub(AccountModel, 'findOne').resolves(null);
      let error = new Error();

      try {
        await transactionService.addCashbackRate(cashback);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(NotFound);
      expect(error.message).to.be.equal('Account does not exist');
    });

    it('Should throw an error if account is deactivated', async () => {
      sinon.stub(TransactionModel, 'findOne').resolves(createdResult as TransactionModel);
      sinon.stub(AccountModel, 'findOne').resolves(deactivatedLogin as AccountModel);
      let error = new Error();

      try {
        await transactionService.addCashbackRate(cashback);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Unauthorized);
      expect(error.message).to.be.equal('Account deactivated');
    });

    it('Successfully updates the cashback', async () => {
      const first = sinon.stub(TransactionModel, 'findOne').resolves(createdResult as TransactionModel);
      const second = sinon.stub(AccountModel, 'findOne').resolves(activateLogin as AccountModel);
      const third = sinon.stub(TransactionModel, 'update').resolves();

      await transactionService.addCashbackRate(cashback);

      sinon.assert.callCount(first, 1);
      sinon.assert.callCount(second, 1);
      sinon.assert.callCount(third, 1);
    });
  });
});
