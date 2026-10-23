const express = require('express');
const app = express();
const port = 3002;

const morgan=require("morgan")
app.use(morgan("combined"))

const path=require("path")
const fs = require('fs');
app.use(express.static(path.join(__dirname,"public")))

const cors=require("cors")
app.use(cors())
const bodyParser=require("body-parser")
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.listen(port,()=>{
    console.log(`My Server listening on port ${port}`)
})

app.get("/",(req,res)=>{
    res.send("This Web server is processed for MongoDB")
})

const { MongoClient, ObjectId } = require('mongodb');
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("FashionData");      
fashionCollection = database.collection("Fashion");

app.get("/fashions",cors(),async (req,res)=>{   
    const result = await fashionCollection.find({}).toArray();
    res.send(result)
    }
)

app.get("/fashions/:id",cors(),async (req,res)=>{
    var o_id = new ObjectId(req.params["id"]);
    const result = await fashionCollection.find({_id:o_id}).toArray();    
    res.send(result[0])
    }
)
app.get("/fashions-add-idf",cors(),async (req,res)=>{
    const fashions = await fashionCollection.find({}).toArray();
    let idf = 1;
    for (const f of fashions){
        await fashionCollection.updateOne({_id:f._id},{$set:{IdF:idf}});
        idf++;
    }
    res.send("Đã thêm IdF cho " + fashions.length + " fashion")
    }
)
app.get("/fashions/idf/:idf",cors(),async (req,res)=>{
    const result = await fashionCollection.find({IdF:parseInt(req.params["idf"])}).toArray();
    res.send(result[0])
    }
)
app.post("/fashions",cors(),async(req,res)=>{   
    //put json Fashion into database
    await fashionCollection.insertOne(req.body)
    //send message to client(send all database to client)
    res.send(req.body)
})












