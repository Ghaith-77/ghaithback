const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("ghaith");
    res.end();
  }
  if (req.url === "/yazan") {
    res.write("yazan");
    res.end();
  }
});
server.listen(3000, () => console.log("iam start"));
