'use strict';
const mysql = require('mysql2');

const connect = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  return connection;
};

const select = (connection, callback, res) => {
  connection.query(
      'SELECT * FROM db_test',
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        console.log(err);
        callback(results, res);
      },
  );
};

const insert = (data, connection, callback) => {
  connection.execute(
      'INSERT INTO db_test (category, title, details, thumbnail, image, original, coordinates) VALUES (?, ?, ?, ?, ?, ?, ?);', data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        console.log(err);
        callback();
      },
  );
};

module.exports = {
  connect: connect,
  select: select,
  insert: insert
};