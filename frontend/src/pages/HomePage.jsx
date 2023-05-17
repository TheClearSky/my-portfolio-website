import React, { useState } from 'react'
import RowContainer from '../components/RowContainer';
import Canvas3D from '../components/Canvas3D';
import NameCard from '../components/NameCard';
import "./HomePage.css";

export default function HomePage() {
    let [rotateTooltip,setRotateTooltip]=useState(true);
    let [chessTooltip,setChessTooltip]=useState(true);
    return (
        <>
            <RowContainer>
                <div className="canvastipandcanvas">
                    { rotateTooltip &&
                    <div>
                        Try Rotating the Tree below!!
                        <button onClick={()=>setRotateTooltip(false)} className="tooltipclosebutton">Close</button>
                    </div>}
                    { chessTooltip &&
                    <div>
                        Click on the chessboard for a surprise!!
                        <button onClick={()=>setChessTooltip(false)} className="tooltipclosebutton">Close</button>
                    </div>}
                    <Canvas3D />
                </div>
                <NameCard />
            </RowContainer>
        </>
    )
}
