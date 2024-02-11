const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
} = require("../controllers/transactionController");
const auth = require("../config/auth");

router.get("/", auth, getTransactions);
router.post("/", auth, addTransaction);

module.exports = router;
