import {
  Model, INTEGER, STRING, FLOAT
} from 'sequelize';
import db from '.';
import AccountModel from './AccountModel';

class TransactionModel extends Model {
  declare id: number;

  declare transactionId: number;

  declare accountId: string;

  declare date: string;

  declare value: number;

  declare cashback: number;
}

TransactionModel.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  transactionId: {
    allowNull: false,
    type: STRING,
  },
  accountId: {
    allowNull: false,
    type: STRING,
  },
  date: {
    allowNull: false,
    type: STRING,
  },
  value: {
    allowNull: false,
    type: FLOAT,
  },
  cashback: {
    allowNull: false,
    type: FLOAT,
  },
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
  underscored: true,
});

TransactionModel.belongsTo(AccountModel, { foreignKey: 'accountId', as: 'account' });

export default TransactionModel;
