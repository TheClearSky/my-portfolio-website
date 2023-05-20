import React from 'react'
import SkillSection from '../components/SkillSection';
import "./SkillsPage.css";

export default function SkillsPage() {
    let delaybetweenbarsinseconds=0.15;
    let developmentskilllist=[
        { skillname:"HTML",         skillpercentage:100 },
        { skillname:"CSS",          skillpercentage:100 },
        { skillname:"Javascript",   skillpercentage:100 },
        { skillname:"React",        skillpercentage:95 },
        { skillname:"React Router", skillpercentage:90 },
        { skillname:"Vite",         skillpercentage:90 },
        { skillname:"Babylon Js",   skillpercentage:100 },
        { skillname:"Konva Js",     skillpercentage:100 },
        { skillname:"Node Js",     skillpercentage:100 },
        { skillname:"Express",     skillpercentage:80 }
    ]
    let deploymentskilllist=[
        { skillname:"Firebase Hosting",         skillpercentage:100 },
        { skillname:"Firebase Authentication",  skillpercentage:100 },
        { skillname:"Firebase Firestore",       skillpercentage:100 },
    ]
    let creativedesignskilllist=[
        { skillname:"Blender",          skillpercentage:95 },
        { skillname:"Figma",            skillpercentage:95 },
        { skillname:"Adobe Photoshop",  skillpercentage:50 },
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
                    animationdelay={`${delaybetweenbarsinseconds*(developmentskilllist.length + deploymentskilllist.length + index+1)}s`}
                />)}
            </div>
        </>
    )
}
