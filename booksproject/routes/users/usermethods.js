let express = require("express");
let router = express.Router();
let asyncH = require("express-async-handler");
let bcryptjs = require("bcryptjs");
let { usermodel, validatePutusers } = require("../../modles/usermodel");
let {virfiytokenandauthoris,verfiyandisadmin} = require("../../Middlewares/virfiytoken")


router.put(
  "/:id",virfiytokenandauthoris,
  asyncH(async (req, res) => {
    let { error } = validatePutusers(req.body);
    if (error) {
      return res.status(400).json({ massege: error.details[0].message });
    }

    let salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, salt);

    let userapdated = await usermodel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    ).select("-password");
    res.status(200).json(userapdated)
  })
);
router.get(
  "/",verfiyandisadmin,
  asyncH(async (req, res) => {
    let users = await  usermodel.find().select("-password")
    res.status(200).json(users)
  })
);


router.get(
  "/:id",virfiytokenandauthoris,
  asyncH(async (req, res) => {
    let user = await usermodel.findById(req.params.id).select("-password")
    if(user){
      res.status(200).json(user)
    }else{
      res.status(400).json({massege:"not found"})
    }
  })
);
router.delete(
  "/:id",virfiytokenandauthoris,
  asyncH(async (req, res) => {
    let user = await usermodel.findById(req.params.id).select("-password")
    if(user){
      await user.findByIdAndDelete(req.params.id)
      res.status(200).json({massege:"user deleted"})
    }else{
      res.status(400).json({massege:"not found"})
    }
  })
);
module.exports = router;
