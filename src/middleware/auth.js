const jwt = require("jsonwebtoken");
const user = require("../models/user");

async function auth(req, res, next) {
  try {
    const token = req.cookies.auth;
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const exists = await user.findOne({ token: token });
    if (!exists) {
      return res.status(200).json({ message: "notLogged" });
    }
    req.id = verify.id;
    req.log = true;
    req.name = exists.name;
    req.pic = exists.pic;
    req.email = exists.email;
    req.google = exists.google;
    req.otp = exists.otp;
    
    next();
  } catch {
    res.status(200).json({ message: "notLogged" });
  }
}

module.exports = auth;
