export const userRegister = {
  name: 'test1',
  email: 'niko@test.com',
  surname: 'amb',
  password: 'niko123asdasdasda4',
};

export const userLogin = {
  email: 'niko@test.com',
  password: 'niko123asdasdasda4',
};

export const userWithToken = {
  id: 1,
  email: 'niko@test.com',
  iat: 12,
  exp: 12,
  refreshToken: '',
  accessToken: '',
};

export const userResponseFromDataBase = {
  id: 15,
  name: 'Steven',
  surname: 'Awesome',
  email: 'niko@test.com',
  password: '$2b$12$WXoav2nWUdc.qYj2xDQ8Y.tJrFjaqDYxPZq54DMF/6yK2Rnidg6AO',
  createdAt: new Date(),
  updatedAt: new Date(),
};
