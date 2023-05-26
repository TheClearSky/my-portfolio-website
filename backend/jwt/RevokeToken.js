import jwt from "jsonwebtoken";
import RevokedToken from "../database/models/RevokedToken.js";

const revokeToken = async (req, res) => {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            await RevokedToken.create({token});

        } catch (error) {

        }
    }

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
};

export default revokeToken;

