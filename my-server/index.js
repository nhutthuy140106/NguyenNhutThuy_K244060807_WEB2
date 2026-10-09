const express=require("express")
const app=express()
const port=3000
const morgan=require("morgan")
app.use(morgan("combined"))
//create default API
app.get("/",(req,res)=>{
    res.send("Hello Restful API")    
})
app.get("/about",(req,res)=>{
    res.send("<font color='blue'>Bạn muốn vào about</font>")    
})
app.listen(port,()=>{
    console.log(`My Server listening on port ${port}`)
})


