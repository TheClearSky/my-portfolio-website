import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/CustomErrorHandlers.js";
import connectToDB from "./database/connectToDB.js";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/UserRoutes.js";
import { authorizetoken } from "./middleware/Authorization.js";
dotenv.config();
connectToDB();
const port=process.env.PORT || 3000;

const app=express();

app.use(cors({
    origin:[process.env.FRONTEND_URL]
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(authorizetoken);

// app.get("/api/users",(req,res)=>{res.send("lol")})
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server started at port ${port}`));