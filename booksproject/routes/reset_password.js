let express = require("express");
let asyncH = require("express-async-handler");
const { usermodel } = require("../modles/usermodel");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
let router = express.Router();

router.get(
  "/sendforgotpasswordlink",
  asyncH((req, res) => {
    res.render("reset_password");
  })
);
router.post(
  "/sendforgotpasswordlink",
  asyncH(async(req, res) => {
    let user = await usermodel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ massege: "email rong" });
    }
    let secretkey = process.env.secretkey + user.password;
    let token = jwt.sign({ email: user.email, id: user.id }, secretkey, {
      expiresIn: "10m",
    });
    let link = `http://localhost:3000/reset_password${user.id}/${token}`;
    res.json({ massege: "click on link", resetpasswordlink: link });
  })
);
router.get(
  "/forgotpasswordview",
   asyncH(async(req, res) => {
    let user = await usermodel.findById(req.params.userid);
    console.log(req.params.userid);
    if (!user) {
      return res.status(404).json({ massege: "user not exsist " });
    }
    let secretkey = process.env.secretkey + user.password;
    try{
        jwt.verify(req.params.token,secretkey)
        res.render("reset-password-view",{email:user.email})
    }catch (e)  {
        console.log(e);
    }
        
    
   
  })
);
router.post(
  "/passwordChangedview",
   asyncH(async(req, res) => {
    let user = await usermodel.findById(req.params.userid);
    if (!user) {
      return res.status(404).json({ massege: "user not exsist " });
    }
    let secretkey = process.env.secretkey + user.password;
    try{
        jwt.verify(req.params.token,secretkey)
        let salt = bcrypt.genSalt(10)
        req.body.password = bcrypt.hash(req.body.password , salt)
        user.password =  req.body.password
        usermodel.save()
        res.render("passwordChangedview",{email:user.email})
    }catch (e)  {
        console.log(e);
    }
   
  })
);
module.exports = router;
