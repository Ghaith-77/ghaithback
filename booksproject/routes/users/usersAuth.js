let express = require("express");
let router = express.Router();
let asyncH = require("express-async-handler");

let {
  usermodel,
  validatePutusers,
  validateLoginusers,
  validateRegisterusers,
} = require("../../modles/usermodel");

router.post(
  "/register",
  asyncH(async(req, res) => {
    let { error } = validateRegisterusers(req.body);
    if (error) {
      return res.status(400).json({ massege: error.details[0].message });
    }
    let user = await usermodel.findOne({ email: req.body.email });
    if (user == true) {
      return res.status(400).json({ massege: "user is already registered" });
    }
    user = new usermodel();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.isAdmin = req.body.isAdmin;

    let resulte = await user.save();
    res.status(200).json(resulte)
  })
);
module.exports = router;
