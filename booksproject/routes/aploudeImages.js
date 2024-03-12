let express = require("express")
const router = express.Router();
let path = require("path")
let multer = require("multer");

let storge = multer.diskStorage({
    distination : (req,file,cb)=>{
        cb(null,path.join(__dirname,"images"))
    },
    filename : (req,file,cb)=>{
        cb(null,new Data().toIsoString().replace(/:/g,"_")+file.originalname)
    }
})
let upload = multer({storge})


router.post("/",(req,res)=>{
    res.status(200).json({massege :"image Uploaded"})
})

