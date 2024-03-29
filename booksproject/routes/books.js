let express = require("express");
let asyncH = require("express-async-handler");
let logger = require("../Middlewares/logger") 

let router = express.Router();
let { validatepostBooks, validateputBooks } = require("../modles/book");
let { Books } = require("../modles/book");

/**
 @disc get book
 @type  GET
 @access public
 
*/

router.get("/", async (req, res) => {
  let {minlenght,maxlenght} = req.query
  let books;
  if(minlenght && maxlenght){
    books = await Books.find({price:{$gte:minlenght,$lte:maxlenght}}).populate('author',[
      "firstname","lastname","_id"
    ])
  }else{
    books = await Books.find().populate('author',[
      "firstname","lastname","_id"
    ])
  }
    
    console.log(books);
      res.status(200).json(books);
});

router.get("/:id", async (req, res) => {
  try {
    let book = await Books.findById(req.params.id)
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(400).send({ mas: "book not found" });
    }
  } catch (e) {
    res.status(500).send({massege: e });
  }
});

router.post(
  "/",
  asyncH((req, res) => {
    let { error } = validatepostBooks(req.body);
    if (error) {
      return res.status(400).json({ massege: error.details[0].message });
    }
      let book = new Books();
      book.title = req.body.title;
      book.descripion = req.body.descripion;
      book.author = req.body.author
      book.cover = req.body.cover;
      book.price =  req.body.price;
      book.save();

      res.status(201).json(book);
  })
);
router.put("/:id", async (req, res) => {
  let { error } = validateputBooks(req.body);
  if (error) {
    return res.status(400).json({ massege: error.details[0].message });
  }
  try {
    let book = await Books.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.firstname,
          description: req.body.lastname,
          cover: req.body.nashunality,
          price: req.body.img,
          author: req.body.author
        },
      },
      { new: true }
    );
    res.status(201).json(book);
  } catch (error) {
    res.status(404).send({ massege: error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let book = await Books.findById(req.params.id);
    if (book) {
      await Books.findByIdAndDelete(req.params.id);
      res.status(201).json({ massege: "auther has benn deleted" });
    } else {
      res.status(401).json({ massege: "auther has not  benn deleted" });
    }
  } catch (error) {
    res.status(500).send({ massege: error });
  }
});


module.exports = router;
