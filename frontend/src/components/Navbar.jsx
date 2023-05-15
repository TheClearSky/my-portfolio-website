import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
    let [openedMenu,setOpenedMenu]=useState(false);
    function toggleOpenedMenu(){setOpenedMenu((prevOpenedMenu)=>!prevOpenedMenu)};
  return (
    
      <nav className={"navbar"+(openedMenu?" openedmenu":"")}>
          <div className={"backgroundblur"+(openedMenu?" openedmenu":"")}></div>
          <div className="logo">ClearSky</div>

          <div className="hamburger" onClick={toggleOpenedMenu}>
              <span className="bar bar1"></span>
              <span className="bar bar2"></span>
              <span className="bar bar3"></span>
              <span className="bar bar4"></span>
          </div>
          <div className="navbuttons">
              <div id="home" className="navbutton  activenavbutton">Home</div>
              <div id="projects" className="navbutton">Projects</div>
              <div id="skills" className="navbutton">Skills</div>
              <div id="contact" className="navbutton">Contact</div>
              <div id="theme" className="navbutton">Theme</div>
          </div>
          
      </nav>
  )
}
