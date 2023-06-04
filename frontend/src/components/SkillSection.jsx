import React, { useEffect, useRef, useState } from 'react';
import "./SkillSection.css";
import iconpaths from './IconConfig';

export default function SkillSection({ name: p_name, percentage: p_percentage, animationdelay: p_animationdelay,iconname:p_iconname }) {

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
                <div className='skillsectionname'>
                    {(p_iconname)&&
                    <img className='skilltechicon' title={p_iconname} alt={p_iconname} key={p_iconname} src={iconpaths[p_iconname]}/>}
                    <span>{p_name}</span>
                </div>
                <div className="skillsectionbarbackground">
                    <div className='skillsectionbar' 
                        style=
                            {{ 
                                transitionDelay: p_animationdelay,
                                width: barprogress
                            }}
                        ref={barRef}
                    />
                </div>
            </div>
        </>
    )
}
