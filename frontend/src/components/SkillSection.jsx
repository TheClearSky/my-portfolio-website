import React, { useEffect, useRef, useState } from 'react';
import "./SkillSection.css";

export default function SkillSection({ name: p_name, percentage: p_percentage, animationdelay: p_animationdelay }) {

    let barRef = useRef(null);
    let [barMounted,setBarMounted]=useState(false);
    useEffect(()=>{
        if(barRef.current==null) return;
        setBarMounted(true);
    },[barRef.current])

    let barprogress=(barMounted ? `${p_percentage}%`:"0%");
    return (
        <>
            <div className='skillsection'>
                <div className='skillsectionname'>{p_name}</div>
                <div className='skillsectionbar' 
                    style=
                        {{ 
                            transitionDelay: p_animationdelay,
                            width: barprogress
                        }}
                    ref={barRef}
                />
            </div>
        </>
    )
}
