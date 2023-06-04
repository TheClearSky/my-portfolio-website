import React from 'react'
import SkillSection from '../components/SkillSection';
import "./SkillsPage.css";

export default function SkillsPage() {
    let delaybetweenbarsinseconds=0.15;
    let developmentskilllist=[
        { skillname:"HTML",        iconname:"html",         skillpercentage:100 },
        { skillname:"CSS",         iconname:"css",          skillpercentage:100 },
        { skillname:"Javascript",  iconname:"javascript",   skillpercentage:100 },
        { skillname:"React",       iconname:"react",        skillpercentage:95 },
        { skillname:"React Router",iconname:"reactrouter",  skillpercentage:90 },
        { skillname:"Redux and RTK",iconname:"redux",       skillpercentage:90 },
        { skillname:"Vite",        iconname:"vite",         skillpercentage:90 },
        { skillname:"Babylon Js",  iconname:"babylonjs",    skillpercentage:100 },
        { skillname:"Konva Js",    iconname:"konva",        skillpercentage:100 },
        { skillname:"Node Js",     iconname:"nodejs",       skillpercentage:100 },
        { skillname:"Express",     iconname:"expressjs",    skillpercentage:95 },
        { skillname:"MongoDB",     iconname:"mongodb",      skillpercentage:80 }
    ]
    let deploymentskilllist=[
        { skillname:"Firebase Hosting",         iconname:"firebase",    skillpercentage:100 },
        { skillname:"Firebase Authentication",  iconname:"firebase",    skillpercentage:100 },
        { skillname:"Firebase Firestore",       iconname:"firebase",    skillpercentage:100 },
        { skillname:"Render",                   iconname:"render",      skillpercentage:100 }
    ]
    let creativedesignskilllist=[
        { skillname:"Blender",          iconname:"blender",     skillpercentage:95 },
        { skillname:"Figma",            iconname:"figma",       skillpercentage:95 },
        { skillname:"Adobe Photoshop",  iconname:"photoshop",   skillpercentage:50 },
    ]
    return (
        <>
            <h2 className="skillcategorytitle">Development Skills</h2>
            <div className='skillcategory'>
                {developmentskilllist.map((skill,index)=>
                <SkillSection 
                    key={skill["skillname"]} 
                    name={skill["skillname"]} 
                    percentage={skill["skillpercentage"]} 
                    iconname={skill["iconname"]}
                    animationdelay={`${delaybetweenbarsinseconds*(index+1)}s`}
                />)}
            </div>
            <h2 className="skillcategorytitle">Deployment Skills</h2>
            <div className='skillcategory'>
                {deploymentskilllist.map((skill,index)=>
                <SkillSection 
                    key={skill["skillname"]} 
                    name={skill["skillname"]} 
                    percentage={skill["skillpercentage"]} 
                    iconname={skill["iconname"]}
                    animationdelay={`${delaybetweenbarsinseconds*(developmentskilllist.length + index+1)}s`}
                />)}
            </div>
            <h2 className="skillcategorytitle">Creative Design Skills</h2>
            <div className='skillcategory'>
                {creativedesignskilllist.map((skill,index)=>
                <SkillSection 
                    key={skill["skillname"]} 
                    name={skill["skillname"]} 
                    percentage={skill["skillpercentage"]} 
                    iconname={skill["iconname"]}
                    animationdelay={`${delaybetweenbarsinseconds*(developmentskilllist.length + deploymentskilllist.length + index+1)}s`}
                />)}
            </div>
        </>
    )
}
