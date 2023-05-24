import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port=process.env.PORT || 3000;

const app=express();

app.get('/',(req,res)=>{
    res.send("ok");
})

app.listen(port,()=>console.log(`Server started at port ${port}`));