import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    gameIsRunning: false,
    currentlyAnimating: false,
    signalToStopAnimation:false,
    signalToGetPromotionPiece:false,
    promotionpiece:null,
    boardready:false,
    gameMode:{
        singleOrMulti:"Single Player",
        singlePlayerMode:"Pass And Play",
        multiPlayerMode:"Join Game",
        color:"White"
    },
    //for multiplayergames
    multiplayer:{
        gameID:null,
        userJoinRequestGameID:null,
        opponentname:null,
        errormessage:null
    },
}

export const chessSlice = createSlice({
    name: 'chess',
    initialState,
    reducers: {
        startGame: (state) => {
            state.gameIsRunning=true;
        },
        endGame: (state) => {
            state.gameIsRunning=false;
        },
        startAnimation: (state) => {
            state.currentlyAnimating=true;
        },
        endAnimation: (state) => {
            state.currentlyAnimating=false;
        },
        sendStopAnimationSignal:(state) =>{
            state.signalToStopAnimation=true;
        },
        sendSignalToGetPromotionPiece:(state)=> {
            state.signalToGetPromotionPiece=true;
        },
        setPromotionPiece:(state,action)=>{
            switch(action.payload.toLowerCase())
            {
                case "queen":
                    state.promotionpiece="q";
                    break;
                case "rook":
                    state.promotionpiece="r";
                    break;
                case "knight":
                    state.promotionpiece="n";
                    break;
                case "bishop":
                    state.promotionpiece="b";
                    break;
            }
            state.signalToGetPromotionPiece=false;
        },
        readThePromotionPiece:(state)=>{
            state.promotionpiece=null;
        },
        updateSingleOrMulti:(state,action)=>{
            state.gameMode.singleOrMulti=action.payload;
        },
        updateSinglePlayerMode:(state,action)=>{
            state.gameMode.singlePlayerMode=action.payload;
        },
        updateMultiPlayerMode:(state,action)=>{
            state.gameMode.multiPlayerMode=action.payload;
        },
        updateColor:(state,action)=>{
            state.gameMode.color=action.payload;
        },
        setGameID:(state,action)=>{
            state.multiplayer.gameID=action.payload;
        },
        setOpponentName:(state,action)=>{
            state.multiplayer.opponentname=action.payload;
        },
        clearMultiplayerDetails:(state)=>{
            state.multiplayer.opponentname=null;
            state.multiplayer.gameID=null;
            state.multiplayer.userJoinRequestGameID=null;
            state.errormessage=null;
        },
        setMultiplayerErrorMessage:(state,action)=>{
            state.multiplayer.errormessage=action.payload;
        },
        sendRequestToJoinGameID:(state,action)=>{
            state.multiplayer.userJoinRequestGameID=action.payload;
        },
        readRequestToJoinGameID:(state)=>{
            state.multiplayer.userJoinRequestGameID=null;
        },
        clearMultiplayerErrorMessage:(state)=>{
            state.multiplayer.errormessage=null;
        },
        boardisReady:(state)=>{
            state.boardready=true;
        },
        boardisnotReady:(state)=>{
            state.boardready=false;
        }
    },
})


export const { startGame,endGame,startAnimation,endAnimation,sendStopAnimationSignal,sendSignalToGetPromotionPiece,setPromotionPiece,readThePromotionPiece,updateSingleOrMulti,updateSinglePlayerMode,updateMultiPlayerMode,updateColor,setGameID,setOpponentName,clearMultiplayerDetails,setMultiplayerErrorMessage,sendRequestToJoinGameID,readRequestToJoinGameID,clearMultiplayerErrorMessage,boardisReady,boardisnotReady} = chessSlice.actions;

export default chessSlice.reducer;