import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    gameIsRunning: false,
    currentlyAnimating: false,
    signalToStopAnimation:false
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
        }
    },
})


export const { startGame,endGame,startAnimation,endAnimation,sendStopAnimationSignal } = chessSlice.actions;

export default chessSlice.reducer;