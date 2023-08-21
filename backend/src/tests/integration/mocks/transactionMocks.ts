const findAllReturn = [
  {
    dataValues: [{
      id: 1,
      transaction_id: '123123123345453567765734',
      account_id: 1,
      date: '2023-03-09T09:23:58.000Z',
      value: 105.30,
      cashback: 0.02,
    },
    {
      id: 3,
      transaction_id: '543687200954763209801235',
      account_id: 1,
      date: '2023-03-09T09:23:58.000Z',
      value: 1024.47,
      cashback: 0.03,
    }],
  },
];

const validBody = {
  value: 100,
  document: '472.360.750-19',
  date: '2023-03-10T09:23:58.000Z',
};

const deactivatedAcc = {
  dataValues: {
    status: 0,
  },
};

const activeAcc = {
  dataValues: {
    status: 1,
  },
};

const createdTransaction = {
  dataValues: {
    id: 6,
    transactionId: '123456',
    accountId: 1,
    date: '2023-03-10T09:23:58.000Z',
    value: 100,
    cashback: 0.00,
  },
};

const validCashback = {
  transactionId: '123456',
  cashback: 0.02,
};

export {
  findAllReturn, validBody, deactivatedAcc, activeAcc, createdTransaction, validCashback,
};
