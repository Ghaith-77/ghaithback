let jwt = require("jsonwebtoken");

function virfiytoken (req,res,next){
    let token = req.headers.token
    
    if(token){
        try {
            let decoded = jwt.verify(token,process.env.secretkey)
            req.user = decoded
            next() // تمرير السيطرة إلى الدالة الأصلية
        } catch (error) {
            res.status(401).json({massege:"invailed token"})
        }
    }
    else{
        res.status(401).json({massege:"no token"})
    }
}

function virfiytokenandauthoris (req,res,next){
    virfiytoken(req,res,()=>{
        if(req.user.id == req.params.id ||req.user. isAdmin){
            next()
        }else{
            return res.status(403).json({massege:"not authorise"})
        }
    })
}

function isadmin (req,res,next){
    if( req.user.isAdmin ){
        next()
    }else{
        return res.status(403).json({massege:"you not admin"})
    }
}
module.exports = {
    virfiytoken,
    virfiytokenandauthoris,
    isadmin
}