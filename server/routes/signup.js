const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req,res) => {
  res.send("signup");
})

router.post("/", async(req,res) => {
    console.log("signup");

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const mail = req.body.mail;
    const dateOfBirth = req.body.dateOfBirth;
    const phone = req.body.phone;
    const role = req.body.role;
    const password1 = req.body.password;
    const password2 = req.body.verifyPassword;
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    const registration = date;
    
    console.log (firstName);
    console.log (lastName);
    console.log (mail);
    console.log (dateOfBirth);
    console.log (phone);
    console.log (role);
    console.log (password1);
    console.log (password2);
    console.log(registration);

    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password1, salt);
    newUser = new User(firstName, lastName, mail, dateOfBirth, phone, hash, role,registration);
    await newUser.persist();
    newUser = await User.fetchByUserId(newUser.id);

    console.log(newUser);

    const token = jwt.sign(
      {
        id: newUser.id,
        mail: newUser.mail,
      },
      "${process.env.JWT_SECRET_KEY}",
      {
        expiresIn: "1y",
      }
    );

    return res.json({
      token: token,
      user: newUser,
    });
});

module.exports = router;