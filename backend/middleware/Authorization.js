import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import RevokedToken from '../database/models/RevokedToken.js';
import User from '../database/models/User.js';

async function getUserFromToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const tokenExists = await RevokedToken.findOne({ token }).exec();
  if (tokenExists) {
    throw new Error("Token has been Revoked");
  }
  return User.findById(decoded.userId).select('-password').exec();
}
const authorizetoken = asyncHandler(async (req, res, next) => {
  let token = req.headers?.authorization?.split(' ')[1];
  if (token) {
    try {

      req.user = await getUser(token);

    } catch (error) {
      req.user = {};
    }
  } else {
    req.user = {};
  }
  next();
});

export { authorizetoken,getUserFromToken };