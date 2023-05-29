import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useGetProfileQuery,useMakeGuestUserMutation } from '../apiSlices/userApiSlice';
import ProfileMenu from './ProfileMenu';

export default function Navbar() {
    let [openedMenu, setOpenedMenu] = useState(false);
    function toggleOpenedMenu() { setOpenedMenu((prevOpenedMenu) => !prevOpenedMenu) };
    let [openedProfileMenu, setOpenedProfileMenu] = useState(false);
    function toggleOpenedProfileMenu() { setOpenedProfileMenu((prevOpenedProfileMenu) => !prevOpenedProfileMenu) };
    
    
    const [makeNewGuestUser, result] = useMakeGuestUserMutation();
    const [triedToMakeGuestUser,setTriedToMakeGuestUSer]=useState(false);

    const { data:profileData,isSuccess:profileSucessfullyFetched,isError:profileFetchFailed,error:profileError,isFetching:isProfileFetching } = useGetProfileQuery();
    
    useEffect(()=>{
        async function trymakingguesuser()
        {
            try{
                await makeNewGuestUser();
                setTriedToMakeGuestUSer(true);
            }
            catch(error)
            {
                setTriedToMakeGuestUSer(true);
            }
        }
        if(!isProfileFetching && profileFetchFailed && (!triedToMakeGuestUser))
        {
            trymakingguesuser();
        }
        else if(!isProfileFetching && profileSucessfullyFetched)
        {
            setTriedToMakeGuestUSer(false);
        }
    },[isProfileFetching]);

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
                <div className="navbuttons">
                    <NavLink  className="navbutton" onClick={()=>setOpenedMenu(false)} to="/">Home</NavLink>
                    <NavLink  className="navbutton" onClick={()=>setOpenedMenu(false)} to="/projects" >Projects</NavLink>
                    <NavLink  className="navbutton" onClick={()=>setOpenedMenu(false)} to="/skills" >Skills</NavLink>
                    <NavLink  className="navbutton" onClick={()=>setOpenedMenu(false)} to="/contact" >Contact</NavLink>
                    {/* <NavLink  className="navbutton" onClick={()=>setOpenedMenu(false)} to="/theme" >Theme</NavLink> */}
                </div>
                <div onClick={toggleOpenedProfileMenu} className="profile">
                    {openedProfileMenu && 
                    <ProfileMenu isLoading={isProfileFetching} isError={profileFetchFailed&&triedToMakeGuestUser} name={profileData?.name} email={profileData?.email} guest={profileData?.guest}/>}
                </div>
                

            </nav>
            <Outlet />
        </>
    )
}
