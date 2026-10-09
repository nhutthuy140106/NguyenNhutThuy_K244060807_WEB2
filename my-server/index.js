const express=require("express")
const app=express()
const port=3000
//create default API
app.get("/",(req,res)=>{
    res.send("Hello Restful API")
})
app.listen(port,()=>{
    console.log(`My Server listening on port ${port}`)
})

