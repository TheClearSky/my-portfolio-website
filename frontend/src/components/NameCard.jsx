import React, { useState } from 'react'
import "./NameCard.css";

export default function NameCard({textDelayInSeconds:p_textDelayInSeconds=5}) {

    const textlist=["That Stands Out","Awesome"];
    //Todo
    //Make this wok for more than 2 texts
    const animatedtexts=textlist.map(
        (text,index)=>
        <div key={text} style={{animationDelay:`-${(index+1)*p_textDelayInSeconds}s`}}>{text}</div>
        )

    const [minimized,setMinimized]=useState(true);
    function toggleminimized()
    {
        setMinimized((prevMinimized)=>!prevMinimized);
    }
  return (
    <div className={"glasscard card"+((minimized)?" minimized":"")}>
        {(minimized)?
        <>
            <div onClick={toggleminimized} className="minimizebutton title">+</div>
            <div className='maximizename title' >NameCard</div>
        </>
        :
        <>
            <div onClick={toggleminimized} className="minimizebutton title">-</div>
            <div className="title">Hello, I am Deepak Prasad</div>
            <div className="content">
                Let's build something
            </div>
            <div className="textanimation" style={{animationDuration:`${p_textDelayInSeconds*textlist.length}s`}}>
                {animatedtexts}
            </div>
        </>}
    </div>
  )
}
