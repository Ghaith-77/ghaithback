let mongoose = require("mongoose");

async function Dbconnect() {
  await mongoose.connect(process.env.conect).then(() => {
    console.log("yazan horema");
  });
}
module.exports = Dbconnect;
