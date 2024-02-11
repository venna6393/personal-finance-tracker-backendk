const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = auth;
