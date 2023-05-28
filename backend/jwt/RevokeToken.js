import jwt from "jsonwebtoken";
import RevokedToken from "../database/models/RevokedToken.js";

const revokeToken = async (req, res) => {
    let token = req.headers?.authorization?.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            await RevokedToken.create({token});

        } catch (error) {

        }
    }
};

export default revokeToken;

