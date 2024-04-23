const chalk = require('chalk');
const Records = require('./models/Record');

const search = (searchText) => {
  return {
    $or: [
      { text: { $regex: searchText } },
      { fio: { $regex: searchText } },
      { tel: { $regex: searchText } },
    ],
  };
};

async function createRecord(fio, tel, text) {
  await Records.create({
    fio,
    tel,
    text,
    date: new Date().toISOString().substring(0, 16).replace('T', ' '),
  });
  console.log(chalk.green.inverse('Record was added!'));
}

async function getRecords(skip, limit, searchText) {
  const records = searchText
    ? await Records.find(search(searchText)).skip(skip).limit(limit)
    : await Records.find().skip(skip).limit(limit);
  return records;
}

async function getCountRecords(searchText) {
  const countRecords = searchText
    ? await Records.find(search(searchText)).count()
    : await Records.find().count();
  return countRecords;
}

module.exports = {
  createRecord,
  getRecords,
  getCountRecords,
};
