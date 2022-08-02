const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const User = require("../models/UserModel");

module.exports = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    req.token = token;
    console.log(token)
    jwt.verify(token, "${process.env.JWT_SECRET_KEY}", async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      req.user = await User.fetchByUserId(user.id);
      console.log("Verifyan token");
      console.log (req.user);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
