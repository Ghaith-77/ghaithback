let express = require("express");
let app = express();

let joi = require("joi");

let bookspath = require("./routes/books");
let authorspath = require("./routes/authors");

let mongoose = require("mongoose");
mongoose.connect("mongodb+srv://gaesx1x2:gaesx1x2@cluster0.t9sqeyn.mongodb.net/?retryWrites=true&w=majority").then(() => {
  console.log("yazan horema");
});



app.use(express.json());

app.use("/books", bookspath);

app.use("/authors", authorspath);

app.use(express.json());
app.use("/books", bookspath);

app.listen(3000, () => {
  console.log("Iam running");
});
