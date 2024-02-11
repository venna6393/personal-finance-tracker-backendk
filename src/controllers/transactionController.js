const db = require("../config/db");

const getTransactions = (req, res) => {
  db.all(
    `SELECT * FROM transactions WHERE user_id = ?`,
    [req.userId],
    function (err, transactions) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res.status(200).json({ transactions });
    }
  );
};

const addTransaction = (req, res) => {
  const { date, category, amount } = req.body;

  db.run(
    `INSERT INTO transactions (user_id, date, category, amount) VALUES (?,?,?,?)`,
    [req.userId, date, category, amount],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res
        .status(201)
        .json({ message: "Transaction added successfully" });
    }
  );
};

module.exports = {
  getTransactions,
  addTransaction,
};
