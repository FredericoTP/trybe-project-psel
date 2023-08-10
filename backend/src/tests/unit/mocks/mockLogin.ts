const emptyLogin = {
  document: '',
  password: '',
};

const infoLogin = {
  document: '123456987-10',
  password: '123456',
};

const invalidLogin = {
  dataValues: {
    status: 0,
  },
};

const validLogin = {
  dataValues: {
    id: 1,
    name: 'Fred',
    email: 'test@test.com',
    password: '123456',
    status: 1,
  },
};

export {
  emptyLogin, infoLogin, invalidLogin, validLogin,
};
