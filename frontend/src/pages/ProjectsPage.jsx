import React from 'react'
import ProjectSection from '../components/ProjectSection'
import "./ProjectsPage.css";

//Todo
//Make a falling object that spirals as i scroll
export default function ProjectsPage() {
  return (
    <div className='projectslist'>
        <ProjectSection
            newCategoryTitle={"Solo Projects"}
            title={"ClearSky Academy"}
            imagesrclist={["./images/projects/clearskyacademy1.webp","./images/projects/clearskyacademy2.webp","./images/projects/clearskyacademy3.webp","./images/projects/clearskyacademy4.webp"]}
            iconnamelist={["typescript","react","vite","tailwind","threejs"]}
            githublink={"https://github.com/TheClearSky/clearsky-academy"}
            linktoproject={"https://theclearsky.github.io/clearsky-academy/"}
        >
            Animated Maths, Physics and Chemistry for CBSE Classes 9–12 and JEE, one chapter at a time. Every class is a collectible card that earns its finish as you learn, every chapter a path of topics to watch and play with, all on a procedural three.js night stage: a moonlit academy, painted trees and floating books.
        </ProjectSection>
        <ProjectSection
            title={"Nodestra"}
            imagesrclist={["./images/projects/nodestra1.webp","./images/projects/nodestra2.webp","./images/projects/nodestra3.webp","./images/projects/nodestra4.webp"]}
            iconnamelist={["typescript","react","vite","tailwind","threejs"]}
            githublink={"https://github.com/TheClearSky/nodestra"}
            linktoproject={"https://theclearsky.github.io/nodestra/"}
        >
            Build instruments and songs from nodes and hear every change. Wire up oscillators, physically modelled strings and ready-made effects; draw timeline curves, find a tempo that fits your notes, and let Blip, a small conductor, guide you through. Built on my open-source node editor library, react-blender-nodes.
        </ProjectSection>
        <ProjectSection
            title={"My Portfolio Website ( This website ) [Stack:MERN]"}
            iconnamelist={["html","css","javascript","mongodb","expressjs","react","nodejs","reactrouter","redux","vite","babylonjs","firebase","render"]}
            githublink={"https://github.com/TheClearSky/my-portfolio-website"}
        >
            A website displaying my portfolio, uses the latest 3d WebGL and WebGPU graphics using Babylon Js to build an awesome experience. Includes a live 3d scene and a chess game. Uses MERN stack for frontend, hosted on firebase(frontend) and render(backend)
        </ProjectSection>
        <ProjectSection 
            title={"A* Algorithm Vizualization"} 
            imagesrclist={["./images/projects/astarviz1.webp","./images/projects/astarviz2.webp"]} 
            iconnamelist={["html","css","javascript","react","vite","konva","firebase"]}
            githublink={"https://github.com/TheClearSky/a-star-algorithm-vizualization"}
            linktoproject={"https://a-star-viz.web.app/"}
        >
            A website visualizing how A* algorithm works on a randomly generated graph, with live traversal, cost calculations and color coded edges. Makes learning this algorithm easier for new students. Uses Konva Js to display awesome 2D HTML canvas graphics.
        </ProjectSection>
        <ProjectSection 
            newCategoryTitle={"Contributed To"} 
            title={"International Conference On Global Mental Health And Public Health Challenges & Innovation 2022 ( GMHPHCI 2022 )"} 
            imagesrclist={["./images/projects/GMHPHCIpic1.webp","./images/projects/GMHPHCIpic2.webp"]}
            iconnamelist={["html","css","javascript","netlify"]}
            githublink={"https://github.com/TheClearSky/gmhphci"}
            linktoproject={"https://gmhphci.netlify.app/"}
        >
            Worked as a website contributer on this global event on mental health, with speakers across the globe, organized at Indian Institute of Information Technology, Ranchi.
        </ProjectSection>
        <ProjectSection 
            title={"Jeevan Rakshak"}  
            imagesrclist={["./images/projects/jeevanrakshak1.webp","./images/projects/jeevanrakshak2.webp"]}
            iconnamelist={["html","css","javascript","react","vite","firebase"]}
            dontRenderBar={true}
            githublink={"https://github.com/TheClearSky/Jeevan-Rakshak"}
            linktoproject={"https://jeevanrakshak.web.app/"}

        >
            Made the website frontend and Figma design on this project in the House of Hackers Hackathon 2023, placed 4th out of 60+ participating teams.
        </ProjectSection>
    </div>
  )
}
