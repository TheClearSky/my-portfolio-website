let games={};
let id=0;
export function handleChessConnection(socket) {
    socket.on("create game",()=>
    {
        games[id]={
            player1:socket.id,
            canbejoined:true
        }
        socket.emit("game created",{
            gameid:id
        })
    })
    socket.on("dev",()=>
    {
        console.log(games,id);
    })
    socket.on("join game",({id})=>{
        
        let game=games[id];
        console.log("ran",id,game);
        if(game && game.canbejoined)
        {
            game.player2=socket.id,
            socket.emit("joined game",{
                gameid:id
            })
            socket.broadcast.to(game.player1).emit("player joined",{id});
        }
        else if(game && ((game.player2===socket.id) || (game.player1===socket.id)))
        {

        }
    })
}