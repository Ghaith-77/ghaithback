let express = require("express")
const router = express.Router();
let path = require("path")
let multer = require("multer");


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../images"));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "_") + file.originalname);
    }
});

let upload = multer({storage})
console.log("upload");
console.log(upload);

router.post("/",upload.single("img"),(req,res)=>{
    res.status(200).json({massege :"image Uploaded",})
})

module.exports = router;


// تجربة على boostman