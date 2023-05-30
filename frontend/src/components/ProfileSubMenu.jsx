import React from 'react';
import "./ProfileSubMenu.css";
import { useState } from 'react';
import { useLoginMutation, useRegisterMutation, useUpdateProfileMutation } from "../apiSlices/userApiSlice";

export default function ProfileSubMenu({activeButton:p_activeButton,setActiveButton:p_setActiveButton,errorMessage:p_errorMessage,setErrorMessage:p_setErrorMessage}) {
    const [submenuValues, setSubmenuValues] = useState({ name: "", email: "",password: "" });

    const handleInputChange = (event) => {
        let {name,value}=event.target;
        setSubmenuValues((prevValues)=>({ ...prevValues, [name]: value }));
    };
    const [loginsubmit, loginresult] = useLoginMutation();
    const [registersubmit,registerresult] = useRegisterMutation();
    const [updateprofilesubmit,updateprofileresult] = useUpdateProfileMutation();
    async function handleSubmenuSubmit()
    {
        let data={},submithandler;
        if(p_activeButton=="Log In")
        {
            data={email:submenuValues.email,password:submenuValues.password};
            submithandler=loginsubmit;
        }
        else if(p_activeButton=="Register")
        {
            data={name:submenuValues.name,email:submenuValues.email,password:submenuValues.password};
            submithandler=registersubmit;
        }
        else if(p_activeButton=="Update Profile")
        {
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
            submithandler=updateprofilesubmit;
        }
        try
        {
            const payload= await submithandler(data);
            if(payload.error)
            {
                throw new Error(payload.error.data.message);
            }
            p_setErrorMessage("");
            p_setActiveButton(null);
        }
        catch(error)
        {
            p_setErrorMessage(error.message);
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
            {(p_errorMessage!=="")&&
            <div className="profilesubmenusubmissionerror">
                Error:{p_errorMessage}
            </div>}
            <button onClick={handleSubmenuSubmit} className="profilesubmenusubmit" >Submit</button>
        </div>
    )
}
