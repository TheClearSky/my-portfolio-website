import React from 'react';
import "./ProfileSubMenu.css";
import { useState } from 'react';
import { useLoginMutation, useRegisterMutation, useUpdateProfileMutation } from "../apiSlices/userApiSlice";

export default function ProfileSubMenu({activeButton:p_activeButton}) {
    const [submenuValues, setSubmenuValues] = useState({ name: "", email: "",password: "" });

    const handleInputChange = (event) => {
        let {name,value}=event.target;
        setSubmenuValues((prevValues)=>({ ...prevValues, [name]: value }));
    };
    const [loginsubmit, loginresult] = useLoginMutation();
    const [registersubmit,registerresult] = useRegisterMutation();
    const [updateprofilesubmit,updateprofileresult] = useUpdateProfileMutation();

    function handleSubmenuSubmit()
    {
        if(p_activeButton=="Log In")
        {
            loginsubmit({email:submenuValues.email,password:submenuValues.password});
        }
        else if(p_activeButton=="Register")
        {
            registersubmit({name:submenuValues.name,email:submenuValues.email,password:submenuValues.password});
        }
        else if(p_activeButton=="Update Profile")
        {
            let data={};
            if(submenuValues.name!=="")
            {
                data.name=submenuValues.name;
            }
            if(submenuValues.email!=="")
            {
                data.email=submenuValues.email;
            }
            if(submenuValues.password!=="")
            {
                data.password=submenuValues.password;
            }
            updateprofilesubmit(data);
        }
    }
    return (
        <div className="submenu">
            {
                (p_activeButton === "Update Profile") &&
                <span style={{whiteSpace:"pre-wrap"}}>
                    Only Fill Those Fields that you want to update and leave the rest blank
                </span>
            }
            {((p_activeButton === "Register")||(p_activeButton === "Update Profile")) &&
                <label>
                    Name:
                    <input className="profilesubmenuinput" name="name" type="text" value={submenuValues.name} onChange={handleInputChange} />
                </label>}
            <label>
                Email:
                <input className="profilesubmenuinput" name="email" type="text" value={submenuValues.email} onChange={handleInputChange} />
            </label>
            <label>
                Password:
                <input className="profilesubmenuinput" name="password" type="password" value={submenuValues.password} onChange={handleInputChange} />
            </label>
            <button onClick={handleSubmenuSubmit} className="profilesubmenusubmit" >Submit</button>
        </div>
    )
}
