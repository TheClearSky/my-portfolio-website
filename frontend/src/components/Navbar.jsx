import React, { useState } from 'react';
import './Navbar.css';
import { NavLink, Outlet } from 'react-router-dom';

export default function Navbar() {
    let [openedMenu, setOpenedMenu] = useState(false);
    function toggleOpenedMenu() { setOpenedMenu((prevOpenedMenu) => !prevOpenedMenu) };
    return (
        <>
            <nav className={"navbar" + (openedMenu ? " openedmenu" : "")}>
                <div className={"backgroundblur" + (openedMenu ? " openedmenu" : "")}></div>
                <div className="logo">ClearSky</div>

                <div className="hamburger" onClick={toggleOpenedMenu}>
                    <span className="bar bar1"></span>
                    <span className="bar bar2"></span>
                    <span className="bar bar3"></span>
                    <span className="bar bar4"></span>
                </div>
                <ul className="navbuttons">
                    <NavLink  className="navbutton" to="/">Home</NavLink>
                    <NavLink  className="navbutton" to="/projects" >Projects</NavLink>
                    <NavLink  className="navbutton" to="/skills" >Skills</NavLink>
                    <NavLink  className="navbutton" to="/contact" >Contact</NavLink>
                    <NavLink  className="navbutton" to="/theme" >Theme</NavLink>
                </ul>

            </nav>
            <Outlet />
        </>
    )
}
