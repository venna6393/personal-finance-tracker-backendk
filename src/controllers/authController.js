const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, hashedPassword],
      function (err) {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        return res
          .status(201)
          .json({ message: "User registered successfully." });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    db.get(
      `SELECT * FROM users WHERE username = ?`,
      [username],
      async function (err, user) {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({ token });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
