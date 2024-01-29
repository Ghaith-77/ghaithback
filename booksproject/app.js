let express = require("express");
let app = express();
app.use(express.json());

let env = require("dotenv")
let joi = require("joi");
env.config()

//middelweres
let logger = require("./Middlewares/logger") 
let {notFound,error} = require("./Middlewares/error") 
//paths
let bookspath = require("./routes/books");
let authorspath = require("./routes/auth");
let userspath = require("./routes/users/usersAuth")


let mongoose = require("mongoose");
mongoose.connect(process.env.conect).then(() => {
  console.log("yazan horema");
});


// app.use(logger)



app.use("/books", bookspath);
app.use("/auth", authorspath);
app.use("/users", userspath);


app.use(notFound)
app.use(error)



app.listen(process.env.port || 3000, () => {
  console.log(`Iam running ${process.env.nodDef}`);
});
