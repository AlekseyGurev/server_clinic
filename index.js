require('dotenv').config();
const mongoose = require('mongoose');
const chalk = require('chalk');
const express = require('express');
const cors = require('cors');
const {
  createRecord,
  getRecords,
  getCountRecords,
} = require('./records.controller');

const { authCheck } = require('./auth-check');

const { createUser, getUser } = require('./users.controller');

const port = 3000;

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    await createRecord(req.body.fio, req.body.tel, req.body.text);
    res.status(200).send({ add: false, error: error });
  } catch (error) {
    res.send({ text: 'ошибка отправки', error: true });
  }
});

app.post('/login', async (req, res) => {
  admin = 'admin';
  password = 'admin';
  try {
    const token = await getUser(req.body.login, req.body.password);
    res.send({ token, error: false });
  } catch (error) {
    res.send({ text: 'ошибка входа', error: true });
  }
});

app.get('/records', async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const searchText = req.query.searchText;
  const token = req.query.token;

  try {
    if (authCheck(token)) {
      const skip = page * limit - limit;
      const countRecords = await getCountRecords(searchText);
      const records = await getRecords(Number(skip), Number(limit), searchText);
      res.status(200).json({ records, countRecords });
    } else {
      res.send({ text: 'ошибка авторизации', error: true });
    }
  } catch (error) {
    res.send({ text: 'ошибка загрузки', error: true });
  }
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(chalk.green(`server has been started on port ${port}...`));
  });
});
