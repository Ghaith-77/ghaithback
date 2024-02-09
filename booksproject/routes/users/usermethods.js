let express = require("express");
let router = express.Router();
let asyncH = require("express-async-handler");
let bcryptjs = require("bcryptjs");
let { usermodel, validatePutusers } = require("../../modles/usermodel");

router.put(
  "/:id",
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
module.exports = router;
