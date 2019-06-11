const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const auth = require("../middleware/auth");

const User = require("../model/User");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select(["-password", "-_id"]);
  if (!user)
    return res
      .status(400)
      .json({ errors: [{ msg: "Kein Benutzer gefunden" }] });

  res.send(user);
});

router.post(
  "/",
  [
    check("email", "Geben Sie eine gültige Email-Adresse ein").isEmail(),
    check("password", "Geben Sie ein Passwort ein")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email-Addresse oder Passwort falsch" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email-Addresse oder Passwort falsch" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 300000,
      });

      res.send({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
  }
);

module.exports = router;
