const chalk = require('chalk');
const Users = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./constants');

async function createUser(login, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  await Users.create({
    login,
    password: passwordHash,
  });
  console.log(chalk.green.inverse('User was added!'));
}

async function getUser(login, password) {
  const user = await Users.findOne({
    login,
  });

  if (!user) {
    throw new Error('User is not found');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('Wrong password');
  }

  return jwt.sign({ login }, JWT_SECRET, { expiresIn: '30d' });
}

module.exports = {
  createUser,
  getUser,
};
