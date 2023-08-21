const accountTransactions = [{
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

const emptyParameter = {
  document: '',
  value: 0,
  date: '',
};

const invalidAccount = {
  document: '123456',
  value: 10,
  date: '2023-04-11T09:23:58.000Z',
};

const deactivatedLogin = {
  dataValues: {
    status: 0,
  },
};

const activateLogin = {
  dataValues: {
    id: 1,
    status: 1,
  },
};

const validAccount = {
  document: '88.615.552/0001-55',
  value: 10,
  date: '2023-04-11T09:23:58.000Z',
};

const createdResult = {
  dataValues: {
    id: 5,
    transactionId: '123456',
    accountId: 1,
    date: '2023-03-10T09:23:58.000Z',
    value: 100,
    cashback: 0.00,
  },
};

const cashback = {
  cashback: 0.02,
  transactionId: '123456',
};

const mockToken = {
  infoToken: {
    id: 1,
  },
};

export {
  accountTransactions,
  emptyParameter,
  invalidAccount,
  deactivatedLogin,
  validAccount,
  activateLogin,
  createdResult,
  cashback,
  mockToken,
};
