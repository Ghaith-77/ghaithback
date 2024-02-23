let mongoose = require("mongoose");

async function Dbconnect() {
  console.log("fds");
  await mongoose.connect(process.env.conect).then(() => {
    console.log("yazan horema");
  }).catch(err =>  console.log(err))


}
module.exports = Dbconnect;
