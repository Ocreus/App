const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if ther is no token
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "Sie müssen sich dafür einloggen" }] });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({
      msg:
        "Sie waren zu lange untätig. Ich habe Sie sicherheitshalber ausgeloggt.",
    });
  }
};
