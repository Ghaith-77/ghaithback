let express = require("express");

let router = express.Router();

let asyncH = require("express-async-handler");

let { validatepostauther, validateputauthers } = require("../modles/auth");
let { auth } = require("../modles/auth");
let Authors = auth
router.get("/", async (req, res) => {
  try {
    let Authors = await Auth.find()
      .sort({ firstname: 1 })
      .select("firstname lastname ");
    if (Authors) {
      res.status(200).json(Authors);
    } else {
      res.status(400).send({ mas: "auther not found" });
    }
  } catch (e) {
    res.status(400).send("no");
  }
});
router.get("/:id", async (req, res) => {
  try {
    let Authors = await Authors.findById(req.params.id);
    if (Authors) {
      res.status(200).json(Authors);
    } else {
      res.status(400).send({ mas: "auther not found" });
    }
  } catch (e) {
    res.status(500).send({ e });
  }
});
router.post(
  "/",
  asyncH((req, res) => {
    let { error } = validatepostauther(req.body);
    if (error) {
      return res.status(400).json({ massege: error.details[0].message });
    }
      let auther = new Authors();
      auther.firstname = req.body.firstname;
      auther.lastname = req.body.lastname;
      auther.nashunality = req.body.nashunality;
      auther.img =  req.body.img;
      auther.save();

      res.status(201).json(auther);
  })
);
router.put("/:id", async (req, res) => {
  let { error } = validateputauthers(req.body);
  if (error) {
    return res.status(400).json({ massege: error.details[0].message });
  }
  try {
    let Authors = await Authors.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          nashunality: req.body.nashunality,
          img: req.body.img,
        },
      },
      { new: true }
    );
    res.status(201).json(Authors);
  } catch (error) {
    res.status(404).send({ massege: error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let outher = await Authors.findById(req.params.id);
    if (outher) {
      await Authors.findByIdAndDelete(req.params.id);
      res.status(201).json({ massege: "auther has benn deleted" });
    } else {
      res.status(401).json({ massege: "auther has not  benn deleted" });
    }
  } catch (error) {
    res.status(500).send({ massege: error });
  }
});

module.exports = router;
