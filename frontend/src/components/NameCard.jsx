import React from 'react'
import "./NameCard.css";

export default function NameCard({textDelayInSeconds:p_textDelayInSeconds=5}) {

    const textlist=["That Stands Out","Awesome"];
    //Todo
    //Make this wok for more than 2 texts
    const animatedtexts=textlist.map(
        (text,index)=>
        <div key={text} style={{animationDelay:`-${(index+1)*p_textDelayInSeconds}s`}}>{text}</div>
        )
  return (
    <div className="glasscard card">
        <div className="title">Hello, I am Deepak Prasad</div>
        <div className="content">
            Let's build something
        </div>
        <div className="textanimation" style={{animationDuration:`${p_textDelayInSeconds*textlist.length}s`}}>
            {animatedtexts}
        </div>
    </div>
  )
}
