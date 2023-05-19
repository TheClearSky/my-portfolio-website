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
            title={"My Portfolio Website ( This website )"}
            iconnamelist={["html","css","javascript","react","reactrouter","vite","babylonjs","firebase"]}
            githublink={"https://github.com/TheClearSky/my-portfolio-website"}
        >
            A website displaying my portfolio, uses the latest 3d WebGL and WebGPU graphics using Babylon Js to build an awesome experience. Includes a live 3d scene and a chess game.
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
