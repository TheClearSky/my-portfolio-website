import { createSlice } from '@reduxjs/toolkit'

// {{const [singleOrMulti,setSingleOrMulti]=useState("Single Player");
//     //Pass And Play || Computer
//     const [singlePlayerMode,setSinglePlayerMode]=useState("Pass And Play");
//     //Create Game || Join Game || Random Match
//     const [multiPlayerMode,setMultiPlayerMode]=useState("Join Game");
//     //Black || White
//     const [color,setColor]=useState("White");}}
const initialState = {
    gameIsRunning: false,
    currentlyAnimating: false,
    signalToStopAnimation:false,
    signalToGetPromotionPiece:false,
    promotionpiece:null,
    gamemoMode:{
        singleOrMulti:"Single Player",
        singlePlayerMode:"Pass And Play",
        multiPlayerMode:"Join Game",
        color:"White"
    }
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
            state.gamemoMode.singleOrMulti=action.payload;
        },
        updateSinglePlayerMode:(state,action)=>{
            state.gamemoMode.singlePlayerMode=action.payload;
        },
        updateMultiPlayerMode:(state,action)=>{
            state.gamemoMode.multiPlayerMode=action.payload;
        },
        updateColor:(state,action)=>{
            state.gamemoMode.color=action.payload;
        }
    },
})


export const { startGame,endGame,startAnimation,endAnimation,sendStopAnimationSignal,sendSignalToGetPromotionPiece,setPromotionPiece,readThePromotionPiece,updateSingleOrMulti,updateSinglePlayerMode,updateMultiPlayerMode,updateColor} = chessSlice.actions;

export default chessSlice.reducer;