const db = require("../config/db");

const createTransactionTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            date DATE,
            category TEXT,
            amount REAL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;
  return db.run(sql);
};

module.exports = {
  createTransactionTable,
};
