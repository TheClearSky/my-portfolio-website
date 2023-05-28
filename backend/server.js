import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/CustomErrorHandlers.js";
import connectToDB from "./database/connectToDB.js";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/UserRoutes.js";
import { authorizetoken } from "./middleware/Authorization.js";
import { Server } from "socket.io";
import { handleChessConnection } from "./routes/ChessRoutes.js";
dotenv.config();
connectToDB();
const port=process.env.PORT || 3000;

const app=express();

let frontendurl;
if(process.env.CURRENT_ENVIRONMENT=="PROD")
{
    frontendurl=process.env.FRONTEND_URL;
}
else
{
    frontendurl=process.env.FRONTEND_URL_DEV;
}
app.use(cors({
    origin:[frontendurl],
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(authorizetoken);

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const httpServer = app.listen(port,()=>console.log(`Server started at port ${port}`));

const io = new Server(httpServer);

io.of("/chess").on('connection', handleChessConnection);
export {io};