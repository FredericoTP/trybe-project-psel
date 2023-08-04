// @ts-ignore
import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { AccountService } from '../../services';
import { AccountController } from '../../controllers';
import {
  deleteController, returnCreate, updateController, validParameters,
} from './mocks/mockAccount';
import AccountModel from '../../database/models/AccountModel';

chai.use(sinonChai);

const { expect } = chai;

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
    accountService = new AccountService();
    accountController = new AccountController(accountService);
  });

  describe('Testing create method', () => {
    it('Successfully creates an account', async () => {
      req.body = validParameters;
      sinon.stub(accountService, 'create').resolves(returnCreate as AccountModel);

      await accountController.create(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(returnCreate);
    });
  });

  describe('Testing update method', () => {
    it('Successfully updates an account', async () => {
      req.body = updateController;
      sinon.stub(accountService, 'update').resolves();

      await accountController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Account has been updated' });
    });
  });

  describe('Testing delete method', () => {
    it('Successfully delete an account', async () => {
      req.body = deleteController;
      sinon.stub(accountService, 'delete').resolves();

      await accountController.delete(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Account has been deleted' });
    });
  });
});
