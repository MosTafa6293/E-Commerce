const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(404).json({ msg: "token is not valid" });
  }
  try {
    const decoded = await jwt.verify(token, "laca");
    req.user = await User.findById(decoded._id);
    next();
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: "user is not authorized" });
  }
};
const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(404).json({ msg: "user is not admin" });
  }
};
module.exports = {
  auth,
  admin,
};
