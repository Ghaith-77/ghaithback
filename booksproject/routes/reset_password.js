const express = require("express");
const asyncH = require("express-async-handler");
const { usermodel, validateresetPasssword } = require("../modles/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
let nodemailer = require("nodemailer");
router.get(
  "/sendforgotpasswordlink",
  asyncH((req, res) => {
    res.render("getemail");
  })
);

router.post(
  "/sendforgotpasswordlink",
  asyncH(async (req, res) => {
    console.log(req.body.email);
    let user = await usermodel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "email wrong" }); // تصحيح الخطأ في الإملاء
    }
    let secretkey = process.env.secretkey + user.password;
    let token = jwt.sign({ email: user.email, id: user._id }, secretkey, {
      // تصحيح في إسم حقل الهوية
      expiresIn: "10m",
    });
    let link = `http://localhost:3000/reset-password/reset-password-view/${user._id}/${token}`; // تصحيح في رابط إعادة تعيين كلمة المرور
    console.log("1");
    let transporter = nodemailer.createTransport({
      service: "email",
      auth: {
        user: process.env.emailUser,
        pass: process.env.passUser,
      },
    });
    console.log("1");

    let mailoption = {
      from: process.env.emailUser,
      to: user.email,
      subject: "reset password",
      html: `
          <div>
          <h2>click to reset password</h2>
          <p>${link}</p>
          </div>
          `,
    };
    console.log("1");

    transporter.sendMail(mailoption, (error, success) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "error" })
      } else {
        console.log(success);
        res.render("link-send")
      }
    })

  })
);

router.get(
  "/reset-password-view/:userid/:token",
  asyncH(async (req, res) => {
    let user = await usermodel.findById(req.params.userid);
    if (!user) {
      return res.status(404).json({ message: "user not exist" }); // تصحيح الخطأ في الرسالة
    }
    let secretkey = process.env.secretkey + user.password;
    try {
      jwt.verify(req.params.token, secretkey);
      res.render("reset-password-view");
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "invalid token" }); // تصحيح الخطأ في الرسالة
    }
  })
);

router.post(
  "/reset-password-view/:userid/:token",
  asyncH(async (req, res) => {
    let { error } = validateresetPasssword(req.body);
    if (error) {
      return res.status(400).json({ massege: error.details[0].message });
    }
    let user = await usermodel.findById(req.params.userid);
    if (!user) {
      return res.status(404).json({ message: "user not exist" }); // تصحيح الخطأ في الرسالة
    }
    let secretkey = process.env.secretkey + user.password;
    try {
      jwt.verify(req.params.token, secretkey);
      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(req.body.password, salt);
      await user.save();
      res.render("passwordChangedview");
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "invalid token" }); // تصحيح الخطأ في الرسالة
    }
  })
);

module.exports = router;
