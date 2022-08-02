const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const db = require('../utils');

router.post("/", async(req,res) => {
  console.log("profile");

  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const mail = req.body.mail;
  const dateOfBirth = req.body.dateOfBirth;
  const phone = req.body.phone;
  const password1 = req.body.password;
  const password2 = req.body.verifyPassword;
  
  console.log (firstName);
  console.log (lastName);
  console.log (mail);
  console.log (dateOfBirth);
  console.log (phone);
  console.log (password1);
  console.log (password2);

  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password1, salt);
  let user = await User.fetchByUserId(id);
  console.log(user);
  user.editUser(firstName,lastName,mail, hash, phone, dateOfBirth);


  const token = jwt.sign(
    {
      id: user.id,
      mail: user.mail,
    },
    "${process.env.JWT_SECRET_KEY}",
    {
      expiresIn: "1y",
    }
  );

  return res.json({
    token: token,
    user: user,
  });
});


module.exports = router;