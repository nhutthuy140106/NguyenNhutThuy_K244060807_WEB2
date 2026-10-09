const express=require("express")
const app=express()
const port=3000
const morgan=require("morgan")
app.use(morgan("combined"))

const path=require("path")
const fs=require("fs")
app.use(express.static(path.join(__dirname,"public")))

const cors=require("cors")
app.use(cors())
const bodyParser=require("body-parser")
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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

let  database=[
    {"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản","Price":70,"Image":"b1.png"},
    {"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao","Price":100,"Image":"b2.png"},
    {"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Image":"b3.png"},
    {"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Image":"b4.png"},
    {"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Image":"b5.png"},
  ]

app.get("/books",(req,res)=>{
    res.send(database)
})

app.get('/books/:id', cors(), (req, res) => {
  const id = req.params['id'];
  const p = database.find(x => x.BookId === id);
  res.send(p);
});

app.post("/books",cors(),(req,res)=>{   
    //put json book into database
    database.push(req.body);
    //send message to client(send all database to client)
    res.send(database)
})





