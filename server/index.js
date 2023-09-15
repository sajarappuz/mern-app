import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import UserModel from "./models/Users.js"
import Users from "./models/Users.js"

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

mongoose.connect(process.env.MONGO)

app.get("/", (req,res)=>{
    UserModel.find({})
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, 
        {name: req.body.name,
         email: req.body.email,
          age: req.body.age})
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
})

app.get("/getUser/:id", (req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createUser", (req,res) =>{
    UserModel.create(req.body).then(Users => res.json(Users))
    .catch(err => res.json(err))
})

app.listen(3003, ()=>{
    console.log("server is running")
})