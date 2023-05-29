import "./ProfileMenu.css";
import React, { useState } from 'react'
import TabButton from "./TabButton";
import ProfileSubMenu from "./ProfileSubMenu";
import { useLogoutMutation } from "../apiSlices/userApiSlice";

export default function ProfileMenu({ isLoading: p_isLoading,isError:p_isError, name: p_name, email: p_email, guest: p_guest }) {
    const namemaxlen = 25;
    const emailmaxlen = 20;
    if (p_name && p_name.length > namemaxlen) {
        p_name = p_name.substring(0, namemaxlen - 3) + "...";
    }
    if (p_email && p_email.length > emailmaxlen) {
        p_email = p_email.substring(0, emailmaxlen - 3) + "...";
    }

    let [activeButton, setActiveButton] = useState(null);
    function togglemenu(menuname) {
        return function () {
            setActiveButton((prevActiveMenu) => {
                if (prevActiveMenu === menuname) {
                    return null;
                }
                else {
                    return menuname;
                }
            })
        }
    }
    function preventOnclickOfParent(event) {
        event.stopPropagation();
    }
    
    const [logoutsubmit,logoutresult] = useLogoutMutation();
    
    return (
        <div onClick={preventOnclickOfParent} className="profilemenu">
            {(p_isLoading) ?
                <div className="profileloading">Loading...</div>
                :
                (!p_isLoading && p_isError)?
                <div className="profileloading">Error</div>
                :
                <>
                    <div className="profilename">{p_name}</div>
                    <div className="profileemail">Email:{p_email}</div>
                    {p_guest && <div className="profileguest">Note:This is a randomly generated guest account</div>}
                    <div className="profilebuttons">
                        {(p_guest)?
                        <>
                            <TabButton name={"Log In"} isActive={activeButton==="Log In"} onclick={togglemenu("Log In")}/>
                            <TabButton name={"Register"} isActive={activeButton==="Register"} onclick={togglemenu("Register")}/>
                        </>
                        :
                        <>
                            <TabButton name={"Log Out"} onclick={()=>logoutsubmit()} />
                            <TabButton name={"Update Profile"} isActive={activeButton==="Update Profile"} onclick={togglemenu("Update Profile")}/>
                        </>
                        }
                    </div>
                    {activeButton &&
                    <ProfileSubMenu activeButton={activeButton}/>}
                </>
            }
        </div>
    )
}
