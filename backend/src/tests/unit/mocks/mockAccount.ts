const emptyParameter = {
  name: '', password: '123456', email: 'test@test.com', document: '336.934.120-49',
};

const invalidCpf = {
  name: 'Fabio', password: '123456', email: 'test@test.com', document: '336.934.120-48',
};

const invalidCnpj = {
  name: 'Fabio', password: '123456', email: 'test@test.com', document: '44.760.155/0001-01',
};

const validParameters = {
  name: 'Fabio', password: '123456', email: 'test@test.com', document: '44.760.155/0001-00',
};

const returnCreate = {
  dataValues: {
    ...validParameters,
    status: 1,
  },
};

const returnFindOne = {
  dataValues: {
    id: 1,
    ...validParameters,
    status: 1,
  },
};

const emptyUpdate = {
  id: 3,
  name: '',
  email: '',
};

const updateParameters = {
  id: 1,
  name: 'Fred',
  email: 'test@test.com',
};

const updateController = {
  infoToken: {
    id: 1,
  },
  name: 'Fred',
  email: 'test@test.com',
};

const deleteController = {
  infoToken: {
    id: 1,
  },
};

export {
  emptyParameter,
  invalidCpf,
  invalidCnpj,
  validParameters,
  returnCreate,
  returnFindOne,
  emptyUpdate,
  updateParameters,
  updateController,
  deleteController,
};
