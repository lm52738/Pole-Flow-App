const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');
const jwt = require("jsonwebtoken");

router.get("/", (req,res) => {
  res.send("login");
})

router.post("/", async(req,res) => {
  console.log("login");

  const mail = req.body.mail;
  const password = req.body.password;

  console.log(mail);
  console.log(password);

  let user = await User.fetchByEmail(mail);
  if (user.id === undefined || !user.checkPassword(password)) {
    return res.sendStatus(403);
  } else {
    
    console.log(user);
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
  }
  
});

module.exports = router;