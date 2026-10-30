const express = require('express');
const app = express();
const port = 3002;

const morgan=require("morgan")
app.use(morgan("combined"))

const path=require("path")
const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "chuoi-bi-mat-cua-rieng-ban-123"; // sau này nên để trong .env
app.use(express.static(path.join(__dirname,"public")))

const cors=require("cors")
//app.use(cors())
app.use(cors({
    origin: 'http://localhost:4200', 
    credentials: true
}));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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
const { log } = require('console');
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

app.post("/fashions",cors(),verifyToken,async(req,res)=>{
    //put json Fashion into database
    await fashionCollection.insertOne(req.body)
    //send message to client(send all database to client)
    res.send(req.body)
})

app.put("/fashions",cors(),async(req,res)=>{       
    //update json Fashion into database
    await fashionCollection.updateOne(
        {_id:new ObjectId(req.body._id)},//condition for update
        { $set: { //Field for updating
                style: req.body.style,
                fashion_subject:req.body.fashion_subject,
                fashion_detail:req.body.fashion_detail,
                fashion_image:req.body.fashion_image
            } 
        }
        )
    //send Fashion after updating
    var o_id = new ObjectId(req.body._id);
    const result = await fashionCollection.find({_id:o_id}).toArray();    
    res.send(result[0])
})
app.delete("/fashions/:id",cors(),async(req,res)=>{   
    //find detail Fashion with id
    var o_id = new ObjectId(req.params["id"]);
    const result = await fashionCollection.find({_id:o_id}).toArray(); 
    //update json Fashion into database
    await fashionCollection.deleteOne(
        {_id:o_id}
        )
    //send Fashion after remove
    res.send(result[0])
})
app.post('/user-login', async (req, res) => {
    const UserCollection = database.collection("User");        
    const user = await UserCollection.findOne({ 
        username: req.body.username, 
        password: req.body.password 
    });
    if (user) {
        if (req.body.rememberMe) {
            const cookieOptions = {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
                httpOnly: false,
                secure: false, // Set true nếu chạy https
                sameSite: 'Lax'
            };
            res.cookie('remember_user', req.body.username, cookieOptions);
            // Lưu mật khẩu đã mã hóa SHA-256, không lưu mật khẩu gốc
            const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
            res.cookie('remember_password', hashedPassword, cookieOptions);
        }
        const token = jwt.sign(
            { username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).send({
            message: "Login successful!",
            user: { username: user.username, role: user.role },
            token: token
        });
    } else {
        res.status(401).send({ message: "Wrong user or email!" });
    }
});

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: "Missing token" });
    }
    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).send({ message: "Invalid or expired token" });
    }
}

