import asyncHandler from 'express-async-handler';
import User from '../database/models/User.js';
import generateToken from '../jwt/GenerateToken.js';
import revokeToken from '../jwt/RevokeToken.js';

function generateRandomString(minlen=10)
{
    let returnstring="";
    while(returnstring.length<minlen)
    {
        returnstring= Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2);
    }
    return returnstring;
}

const registerGuestUser=asyncHandler(async (req,res)=>{

    const user = await User.create({ 
        name:"Guest User "+generateRandomString(), 
        email:generateRandomString()+"@"+generateRandomString()+".com", 
        password:generateRandomString(),
        guest:true 
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            guest:true
        });
    } else {
        res.status(400);
        throw new Error('Something went wrong while making guest user');
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if( user && (user.guest))
    {
        res.status(401);
        throw new Error("Guest Users can't be logged into. Please Register");
    }
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


const registerUser = asyncHandler(async (req, res) => {
    
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email }).exec();

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //email is unique
    
    let user;
    if(req.user._id) //user is already authenticated
    {
        //finding the user
        user = await User.findById(req.user._id).exec();
        if(user)
        {
            if(user.guest)
            {
                //converting guest user to permanent user
                user.name=name;
                user.email=email;
                user.password=password;
                user.guest=false;
                user=await user.save();
            }
            else
            {
                //user is registered, create another account, we will revoke earlier jwt below
                user = await User.create({ name, email, password });
            }
        }
    }
    else
    {
        user = await User.create({ name, email, password });
    }

    if (user) {
        //revoke previous jwt if it exists
        await revokeToken(req,res);
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


const logoutUser = asyncHandler(async (req, res) => {
    await revokeToken(req, res);
    res.status(200).json({ message: 'Logged out successfully' });
});


const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).exec();

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            guest: user.guest
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).exec();
    
    if (user) {
        if(user.guest)
        {
            throw new Error("Guest users profiles can't be edited, please register");
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        let recalculateToken=false;
        if (req.body.password) {
            user.password = req.body.password;
            recalculateToken=true;
        }

        const updatedUser = await user.save();

        if(recalculateToken)
        {
            await revokeToken(req,res);
            generateToken(res,updatedUser._id);
        }
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
export { registerGuestUser, loginUser, registerUser, logoutUser, getUserProfile, updateUserProfile };