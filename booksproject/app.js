let express = require("express");
let app = express();
let path = require("path")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
let joi = require("joi");

//middelweres
let { notFound, error } = require("./Middlewares/error");

let Dbconnect = require("./Middlewares/dbConect");

Dbconnect();

// app.use(logger)
 app.use(express.static(path.join(__dirname,"images")))// _____________________
app.set("view engine", "ejs");

app.use("/books", require("./routes/books"));
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users/usersAuth"));
app.use("/usermethod", require("./routes/users/usermethods"));
app.use("/reset_password", require("./routes/reset_password"));
app.use("/uploudImage", require("./routes/aploudeImages"));

app.use(notFound);
app.use(error);

app.listen(process.env.port || 3000, () => {
  console.log(`Iam running ${process.env.nodDef}`);
});
