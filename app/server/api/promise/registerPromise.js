const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../model/User");
const UserRegister = require("../../model/UserRegister");

const checkUserRegister = () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("object");
    } catch (error) {
      console.log("object");
    }
  });
};
const checkUser = ({ name, email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const countUser = await User.countDocuments({ email });

      console.log(countUser);
      if (countUser > 0) {
        return reject(
          new Error("msg", { errors: [{ msg: "Email-Addresse vergeben" }] })
        );
      }

      const user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = await jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 3000,
      });

      return resolve(token);
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = {
  checkUserRegister,
  checkUser,
};
