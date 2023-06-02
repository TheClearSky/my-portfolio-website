import ChessGame from "../database/models/ChessGame.js";
import { Chess } from 'chess.js';
import { getUserFromToken } from "../middleware/Authorization.js";
export function handleChessConnection(socket) {
    socket.on("authenticate",(async ({token})=>{
        if(token)
        {
            try {

                socket.chessuser = await getUserFromToken(token);
                socket.emit("authenticated");
            } catch (error) {
            }
        }
    }))
    socket.on("create game",async ({color})=>
    {
        if(!socket.chessuser)
        {
            return;
        }
        let isWhite;
        if((color==="White")||(color==="white"))
        {
            isWhite=true;
        }
        else if((color==="Black")||(color==="black"))
        {
            isWhite=false;
        }
        else
        {
            return;
        }
        let fenString=new Chess().fen()
        const chessgame = await ChessGame.create({ 
            fen:fenString,
            whiteplayer:(isWhite?socket.chessuser._id:null),
            whiteplayersocketID:(isWhite?socket.id:null),
            blackplayer:(isWhite?null:socket.chessuser._id),
            blackplayersocketID:(isWhite?null:socket.id)
        });
        socket.emit("game created",{
            fen:fenString,
            gameID:chessgame._id
        })
    })
    socket.on("join game",async ({gameID})=>{
        
        if(!socket.chessuser)
        {
            return;
        }
        const chessgame=await ChessGame.findById(gameID).populate("whiteplayer").populate("blackplayer").exec();
        if(!chessgame)
        {
            socket.emit("join game failed",{message:"Invalid Game ID"});
            return;
        }
        const joinPlayerID=socket.chessuser._id;
        let notifyToPlayer,yourColor,opponentUser;
        if((!chessgame.blackplayer)&&(!(chessgame?.whiteplayer?._id.toString()===joinPlayerID.toString())))
        {
            chessgame.blackplayer=joinPlayerID;
            chessgame.blackplayersocketID=socket.id;
            yourColor="Black";
            notifyToPlayer=chessgame.whiteplayersocketID;
            opponentUser=chessgame.whiteplayer;
        }
        else if(chessgame?.blackplayer?._id.toString()===joinPlayerID.toString())
        {
            chessgame.blackplayersocketID=socket.id;
            yourColor="Black";
            notifyToPlayer=chessgame.whiteplayersocketID;
            opponentUser=chessgame.whiteplayer;
        }
        else if((!chessgame.whiteplayer)&&(!(chessgame?.blackplayer?._id.toString()===joinPlayerID.toString())))
        {
            chessgame.whiteplayer=joinPlayerID;
            chessgame.whiteplayersocketID=socket.id;
            yourColor="White";
            notifyToPlayer=chessgame.blackplayersocketID;
            opponentUser=chessgame.blackplayer;
        }
        else if(chessgame?.whiteplayer?._id.toString()===joinPlayerID.toString())
        {
            chessgame.whiteplayersocketID=socket.id;
            yourColor="White";
            notifyToPlayer=chessgame.blackplayersocketID;
            opponentUser=chessgame.blackplayer;
        }
        else
        {
            socket.emit("join game failed",{message:"Game is already joined"});
            return;
        }
        await chessgame.save();
        if(opponentUser)
        {
            socket.emit("joined game",{
                yourcolor:yourColor,
                opponentname:opponentUser.name,
                fen:chessgame.fen
            })
        }
        else
        {
            socket.emit("joined game",{
                yourcolor:yourColor,
                fen:chessgame.fen
            })
        }
        if(notifyToPlayer)
        {
            socket.broadcast.to(notifyToPlayer).emit("player joined",{
                opponentname:socket.chessuser.name,
                fen:chessgame.fen
            });
        }
    })
    socket.on("make move",async ({from,to,promotion,gameID})=>
    {
        if(!socket.chessuser)
        {
            return;
        }
        const chessgame=await ChessGame.findById(gameID).exec();
        if(!chessgame) return;
        if(!chessgame.blackplayer) return;
        if(!chessgame.whiteplayer) return;
        if(chessgame.blackplayer._id.toString()===socket.chessuser._id.toString())
        {
            const chess=new Chess(chessgame.fen);
            if(chess.turn()!=='b') return;
            try
            {
                //validation of move
                let move;
                if(promotion)
                {
                    move = chess.move({from,to,promotion});
        
                }
                else
                {
                    move = chess.move({from,to});
                }
                if(chessgame.blackplayersocketID!==socket.id)
                {
                    chessgame.blackplayersocketID=socket.id;
                }
                chessgame.fen=chess.fen();
                await chessgame.save();
                if(chessgame.whiteplayersocketID)
                {
                    if(promotion)
                    {
                        socket.broadcast.to(chessgame.whiteplayersocketID).emit("opponent moved",{from,to,promotion});
                    }
                    else
                    {
                        socket.broadcast.to(chessgame.whiteplayersocketID).emit("opponent moved",{from,to});
                    }
                }
            }
            catch(err)
            {
                socket.emit("invalid move",{})
                return;
            }
        }
        else if(chessgame.whiteplayer._id.toString()===socket.chessuser._id.toString())
        {
            const chess=new Chess(chessgame.fen);
            if(chess.turn()!=='w') return;
            try
            {
                //validation of move
                let move;
                if(promotion)
                {
                    move = chess.move({from,to,promotion});
        
                }
                else
                {
                    move = chess.move({from,to});
                }
                if(chessgame.whitekplayersocketID!==socket.id)
                {
                    chessgame.whiteplayersocketID=socket.id;
                }
                chessgame.fen=chess.fen();
                await chessgame.save();
                if(chessgame.blackplayersocketID)
                {
                    if(promotion)
                    {
                        socket.broadcast.to(chessgame.blackplayersocketID).emit("opponent moved",{from,to,promotion});
                    }
                    else
                    {
                        socket.broadcast.to(chessgame.blackplayersocketID).emit("opponent moved",{from,to});
                    }
                }
            }
            catch(err)
            {
                socket.emit("invalid move",{})
                return;
            }
        }
    })
}