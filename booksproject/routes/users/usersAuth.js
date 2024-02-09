let express = require("express");
let router = express.Router();
let asyncH = require("express-async-handler");
let bcryptjs = require("bcryptjs");
let jwt = require("jsonwebtoken");
let {
  usermodel,
  validatePutusers,
  validateLoginusers,
  validateRegisterusers,
} = require("../../modles/usermodel");

//register
router.post(
  "/register",
  asyncH(async (req, res) => {
    let { error } = validateRegisterusers(req.body);
    if (error) {
      return res.status(400).json({ massege: error.details[0].message });
    }
    let user = await usermodel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ massege: "user is already registered" });
    }
    let salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, salt);
    let newUser = new usermodel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

    let resulte = await newUser.save();
    let token = jwt.sign(
      { id: resulte.id, isadmin: resulte.isAdmin },
      process.env.secretkey,
      { expiresIn: "30d" }
    );
    let { password, ...other } = resulte._doc;
    res.status(200).json({ ...other, token });
  })
);

//login
router.post(
  "/login",
  asyncH(async (req, res) => {
    let { error } = validateLoginusers(req.body);
    if (error) {
      return res.status(400).json({ massege: error.details[0].message });
    }
    let user = await usermodel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ massege: "email or password not correct" });
    }
    let ispasswordCorrect = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!ispasswordCorrect) {
      return res.status(400).json({ massege: "email or password not correct" });
    }
    let token = jwt.sign(
      { id: user.id, isadmin: user.isAdmin },
      process.env.secretkey,
      { expiresIn: "30d" }
    );
    let { password, ...other } = user._doc;
    res.status(200).json({ ...other, token });
  })
);
module.exports = router;
