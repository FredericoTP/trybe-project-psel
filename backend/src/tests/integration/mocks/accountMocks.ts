const withoutName = {
  email: 'test@test.com',
  password: '123456',
  document: '123456789-10',
};

const withouPassword = {
  email: 'test@test.com',
  name: 'Fred',
  document: '123456789-10',
};

const withoutDocument = {
  email: 'test@test.com',
  name: 'Fred',
  password: '123456',
};

const withoutEmail = {
  document: '123456789-10',
  name: 'Fred',
  password: '123456',
};

const invalidCpf = {
  email: 'test@test.com',
  name: 'Fred',
  document: '123456789-10',
  password: '123456',
};

const invalidCnpj = {
  email: 'test@test.com',
  name: 'Fred',
  document: '61.248.492/0001-20',
  password: '123456',
};

const validDocument = {
  email: 'test@test.com',
  name: 'Fred',
  document: '61.248.492/0001-23',
  password: '123456',
};

const returnFindOne = {
  dataValues: {
    id: 1,
    ...validDocument,
    status: 1,
  },
};

const jwtValid = {
  id: 1,
  name: 'Fred',
  email: 'test@test.com',
};

export {
  withoutName,
  withouPassword,
  withoutDocument,
  withoutEmail,
  invalidCnpj,
  invalidCpf,
  validDocument,
  returnFindOne,
  jwtValid,
};
