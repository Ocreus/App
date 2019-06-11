const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../model/User");

router.put("/", (req, res) => {
  const isValidValue = value => {
    const errors = [];

    if (value.search(/ /) !== -1)
      errors.push({ msg: "Leerzeichen nicht erlaubt" });
    if (value.search(/[^-_.a-zA-Z0-9]*/) === -1)
      errors.push({ msg: "Ungültige Zeichen" });

    if (errors.length > 0) return { errors };
    else return true;
  };

  if (Object.keys(req.body).length === 1) {
    const key = Object.keys(req.body)[0];
    const value = req.body[key].trim();
    const errors = isValidValue(value);
    if (errors !== true) return res.send(errors);
    switch (key) {
      case "name": {
        return res.send("Name received");
      }
      case "email": {
        return res.send("Email received");
      }
      default:
        return res.send("Default switch statement in profile.js");
    }
  }
  return res.send("wrong");
});

module.exports = router;
