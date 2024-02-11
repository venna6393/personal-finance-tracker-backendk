const db = require("../config/db");

const createUserTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `;
  return db.run(sql);
};

module.exports = {
  createUserTable,
};
