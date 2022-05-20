const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth, admin } = require("../middleware/auth");
const router = express.Router();
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "please fill fields" });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: "password min length 6 characters" });
  }
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "email is already exists" });
    }
    user = await new User({
      name,
      email,
      password,
    });
    await user.save();
    const token = await jwt.sign({ _id: user._id }, "laca", {
      expiresIn: "3d",
    });
    const docs = {
      name: user.name,
      email: user.email,
      _id: user._id,
      isAdmin: user.isAdmin,
    };
    return res.json({ user: docs, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credintials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid Credintials" });
    }
    const token = await jwt.sign({ _id: user._id }, "laca", {
      expiresIn: "3d",
    });
    const docs = {
      name: user.name,
      email: user.email,
      _id: user._id,
      isAdmin: user.isAdmin,
    };
    return res.json({ user: docs, token });
  } catch (error) {
    return res.status(500).send("server error");
  }
});
router.put("/update", auth, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
});

router.get("/userList", auth, admin, async (req, res) => {
  try {
    let users = await User.find();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(400).send("server error");
  }
});
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    await user.remove();
    return res.json({ msg: "user deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).send("server error");
  }
});
module.exports = router;
