let express = require("express");

let router = express.Router();

let asyncH = require("express-async-handler");

let { validatepostauther, validateputauthers } = require("../modles/auth");
let { authe } = require("../modles/auth");

router.get("/", async (req, res) => {
  let {skip,limit} = req.query
  try {
    let Authors = await authe.find().skip(skip).limit(limit)
      .sort({ firstname: 1 })
      .select("firstname lastname ");
      
    if (Authors) {
      res.status(200).json(Authors);
    } else {
      res.status(400).json({ mas: "auther not found" });
    }
  } catch (e) {
    res.status(400).json({massege:"dsa"});
  }
});
router.get("/:id", async (req, res) => {
  try {
    let Authors = await authe.findById(req.params.id);
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
      let auther = new authe();
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
    let Authors = await authe.findByIdAndUpdate(
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
    let outher = await authe.findById(req.params.id);
    if (outher) {
      await authe.findByIdAndDelete(req.params.id);
      res.status(201).json({ massege: "auther has benn deleted" });
    } else {
      res.status(401).json({ massege: "auther has not  benn deleted" });
    }
  } catch (error) {
    res.status(500).send({ massege: error });
  }
});

module.exports = router;
