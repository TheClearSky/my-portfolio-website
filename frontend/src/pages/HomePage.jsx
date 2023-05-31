import React, { useState } from 'react'
import RowContainer from '../components/RowContainer';
import Canvas3D from '../components/Canvas3D';
import NameCard from '../components/NameCard';
import ChessInfoBox from '../components/ChessInfoBox';
import "./HomePage.css";
import { useDispatch,useSelector } from 'react-redux';
import { sendStopAnimationSignal } from '../apiSlices/chessSlice';

export default function HomePage() {
    let [rotateTooltip,setRotateTooltip]=useState(true);
    let [chessTooltip,setChessTooltip]=useState(true);
    let animating=useSelector(state=>state.chess.currentlyAnimating);
    const dispatch=useDispatch();
    return (
        <>
            <RowContainer style={{maxWidth:"1400px"}}>
                <div className="canvastipandcanvas">
                    { rotateTooltip &&
                    <div>
                        Try Rotating the Tree below!!
                        <button onClick={()=>setRotateTooltip(false)} className="tooltipclosebutton">X</button>
                    </div>}
                    { chessTooltip &&
                    <div>
                        Click on the chessboard for a surprise!!
                        <button onClick={()=>setChessTooltip(false)} className="tooltipclosebutton">X</button>
                    </div>}
                    {(animating)&&
                    <div onClick={()=>dispatch(sendStopAnimationSignal())} className="skipanimationbutton">
                        Skip{" >>"}
                    </div>}
                    <Canvas3D />
                </div>
                <ChessInfoBox/>
                <NameCard />
            </RowContainer>
        </>
    )
}
