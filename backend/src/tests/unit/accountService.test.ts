// @ts-ignore
import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import AccountModel from '../../database/models/AccountModel';
import { AccountService } from '../../services';
import { BadRequest, Conflict, NotFound } from '../../utils/errors';
import {
  emptyParameter,
  invalidCpf,
  invalidCnpj,
  validParameters,
  returnCreate,
  returnFindOne,
  emptyUpdate,
  updateParameters,
} from './mocks/mockAccount';

chai.use(sinonChai);

const { expect } = chai;

let accountService: AccountService;

describe('AccountService', () => {
  beforeEach(() => {
    accountService = new AccountService();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Testing create method', () => {
    it('Should throw an error when a field is empty', async () => {
      let error = new Error();

      try {
        await accountService.create(emptyParameter);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('name cannot be an empty field');
    });

    it('Should throw an error when CPF is invalid', async () => {
      let error = new Error();

      try {
        await accountService.create(invalidCpf);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('CPF inválido');
    });

    it('Should throw an error when CNPJ is invalid', async () => {
      let error = new Error();

      try {
        await accountService.create(invalidCnpj);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('CNPJ inválido');
    });

    it('Should throw an error when account already exists', async () => {
      const mockFindOne = AccountModel.build(validParameters);
      sinon.stub(AccountModel, 'findOne').resolves(mockFindOne);

      let error = new Error();

      try {
        await accountService.create(validParameters);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Account already exists');
    });

    it('Successfully creates an account', async () => {
      sinon.stub(AccountModel, 'findOne').resolves(null);
      sinon.stub(AccountModel, 'create').resolves(returnCreate as AccountModel);

      const create = await accountService.create(validParameters);

      expect(create).to.be.deep.equal(returnCreate);
    });
  });

  describe('Testing findById method', () => {
    it('Should throw an error if account doesn\'t exist', async () => {
      sinon.stub(AccountModel, 'findOne').resolves(null);

      let error = new Error();

      try {
        await accountService.findById(999);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(NotFound);
      expect(error.message).to.be.equal('Account does not exist');
    });

    it('Successfully returns an account', async () => {
      sinon.stub(AccountModel, 'findOne').resolves(returnFindOne as AccountModel);

      const account = await accountService.findById(1);

      expect(account).to.be.deep.equal(returnFindOne);
    });
  });

  describe('Testing update method', () => {
    it('Should throw an error when a field is empty', async () => {
      let error = new Error();

      try {
        await accountService.update(emptyUpdate);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('name cannot be an empty field');
    });

    it('Successfully update an account', async () => {
      const first = sinon.stub(AccountModel, 'findOne').resolves(returnFindOne as AccountModel);
      const second = sinon.stub(AccountModel, 'update').resolves();

      await accountService.update(updateParameters);

      sinon.assert.callCount(first, 1);
      sinon.assert.callCount(second, 1);
    });
  });

  describe('Testing delete method', () => {
    it('Successfully delete an account', async () => {
      const first = sinon.stub(AccountModel, 'update').resolves();

      await accountService.delete(1);

      sinon.assert.callCount(first, 1);
    });
  });
});
