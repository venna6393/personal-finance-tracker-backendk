const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "./database.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(`PRAGMA foreign_keys = ON;`);
  }
});

module.exports = db;
