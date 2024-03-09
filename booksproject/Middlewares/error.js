let notFound = (req,res,next)=>{
    let error = new Error(`notfound - ${req.originalUrl}`)
    res.status(404)
    next(error)
  }
  
  let error = (err,req,res,next)=>{
    let statuscode = res.statusCode === 200 ? 500 :res.statusCode
    res.status(statuscode)
    res.json({massege: err.message})
  }
  
module.exports = {
    notFound,
    error
}