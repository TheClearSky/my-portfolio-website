import React from 'react';
import "./Background.css";
import {startDrawing,stopDrawing} from "./DrawStars.js";
import { useRef,useEffect } from 'react';

export default function Background({children:p_children}) {
    let canvas=useRef(null);
    useEffect(()=>{
        if(canvas==null) return;
        startDrawing(canvas.current);
        return stopDrawing;
    },[canvas])
    return (
        <div className="backgroundnightcolor">
            <canvas ref={canvas} className="backgroundstars">
            </canvas>
            {p_children}
        </div>

  )
}
