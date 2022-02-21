const express= require('express');
const mongoose = require('mongoose');
   
   async function main() {
   await mongoose.connect('mongodb://localhost:27017/myOperator');
}
const app=express()
const port = 3000
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const userSchema = new mongoose.Schema({
	name:String,
	email:String,
	mobile:Number,
    age:Number,
    gender:String
});
const User = mongoose.model("User", userSchema);
      
app.post("/users", async(req, res)=>{
    const {name, email, mobile,age, gender}= req.body
       const response= await User.create({
           name,
           email,
           mobile,
           age,
           gender
       })
       res.status(201).json(response)
    })
      
    //    app.get("/users", async(req, res)=>{
    //    const response= await User.find({age:{$lt:23}})
    //    res.status(201).json(response)
    //    }) // 2.a

    //    app.get("/users", async(req, res)=>{
    //    const response= await User.find({age:{$gte:18}})
    //    res.status(201).json(response)
    //    })  //2.b

    // app.get("/users", async(req, res)=>{
    //         const response= await User.find({$and:[{age:{$gt:18}},{gender:{$eq:"male"}}]})
    //         res.status(201).json(response)
    //         })   //2.c

    // app.get("/users", async(req, res)=>{
    //     const response= await User.find({age:{$nin:[18,23]}})
    //     res.status(201).json(response)
    //     })       //2.d


    app.get("/users", async(req, res)=>{
        const response= await User.find({age:{$in:[25,27]}})
        res.status(201).json(response)
        })


      main()
      .then(console.log)
      .catch(console.error)
      
    app.listen(port, ()=>{
    console.log("server started")
    })