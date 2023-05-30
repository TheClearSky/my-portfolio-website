import React, { useEffect, useRef, useState } from 'react'
import './ProjectSection.css';
import iconpaths from "./IconConfig.js";

export default function ProjectSection({title:p_title,newCategoryTitle:p_newCategoryTitle,dontRenderBar:p_dontRenderBar,imagesrclist:p_imagesrclist,iconnamelist:p_iconnamelist,githublink:p_githublink,linktoproject:p_linktoproject,children:p_children}) {
    let [appeared,setAppeared]=useState(false);
    let sectionRef=useRef(null);
    useEffect(()=>{
        if(sectionRef.current==null) return;

        let observer=new IntersectionObserver((entries,observer)=>{
            setAppeared(entries[0].isIntersecting);
        },{
            rootMargin:"10000px 0px -40% 0px"
        })

        observer.observe(sectionRef.current);

        return ()=>observer.disconnect();
    },[sectionRef.current])


  return (
    <div>
        <div className={"barandtextsplit"+(appeared?" appeared":"")} ref={sectionRef}>
            <div className="projectsectionorbandbar">
                <div className="projectsectionorb"></div>
                {(p_dontRenderBar===undefined)?<div className="projectsectionbar"></div>:""}
            </div>
            <div className='projectsectiontextandimage'>
                {(p_newCategoryTitle!==undefined)?<h2>{p_newCategoryTitle}</h2>:""}
                <h3>{p_title}</h3>
                {(p_iconnamelist!==undefined)?
                p_iconnamelist.map((iconname)=><img className='projecttechicon' title={iconname} alt={iconname} key={iconname} src={iconpaths[iconname]}/>)
                :""}
                <div>
                    {p_children}
                </div>
                <div>
                    {(p_githublink!==undefined)?
                        <a href={p_githublink} target="_blank" >
                            <img src={iconpaths["github"]} className='projecttechicon' alt={p_githublink} title={p_githublink} />
                        </a>
                    :""}
                    {(p_linktoproject!==undefined)?
                        <a href={p_linktoproject} target="_blank">
                            <img src={iconpaths["link"]} className='projecttechicon' alt={p_linktoproject} title={p_linktoproject} />
                        </a>
                    :""}
                </div>
                {(p_imagesrclist!==undefined)?
                p_imagesrclist.map((imgsrc)=><img key={imgsrc} src={imgsrc}/>)
                :""}
            </div>
        </div>
    </div>
  )
}
