const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

// const { checkUserRegister } = require("./promise/registerPromise");
const { checkUser } = require("./promise/registerPromise");

router.post(
  "/",
  [
    check("name", "Geben Sie einen Namen ein")
      .not()
      .isEmpty(),
    check("email", "Geben Sie eine gültige Email-Addresse ein").isEmail(),
    check(
      "password",
      "Das Passwort muss aus mindestens 6 Zeichen bestehen"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // checkUserRegister();
      const token = await checkUser(req.body);

      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
);

module.exports = router;
