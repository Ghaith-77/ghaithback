let express = require("express");
let asyncH = require("express-async-handler");
const { usermodel } = require("../modles/usermodel");
let jwt = require("jsonwebtoken");
let router = express.Router();

router.get(
  "/sendforgotpasswordlink",
  asyncH((req, res) => {
    res.render("reset_password");
  })
);
router.post(
  "/sendforgotpasswordlink",
  asyncH((req, res) => {
    let user = usermodel.findOne({ email: req.body.email });
    if(!user){
        return res.status(404).json({massege : "email rong"})
    }
    let secretkey = process.env.secretkey + user.password
    let token = jwt.sign({email:user.email,id})
    console.log(req.body.email);
  })
);
module.exports = router;
