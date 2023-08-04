const loginInfo = {
  document: '123456789-10',
  password: '123456',
};

const returnFindOne = {
  dataValues: {
    id: 1,
    name: 'Fabio',
    password: '123456',
    email: 'test@test.com',
    document: '123456789-10',
    status: 1,
  },
};

const returnFindOneDel = {
  dataValues: {
    id: 1,
    name: 'Fabio',
    password: '123456',
    email: 'test@test.com',
    document: '123456789-10',
    status: 0,
  },
};

export { loginInfo, returnFindOne, returnFindOneDel };
