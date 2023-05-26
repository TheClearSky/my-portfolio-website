import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import RevokedToken from '../database/models/RevokedToken.js';
import User from '../database/models/User.js';

const authorizetoken = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const tokenExists = await RevokedToken.findOne({ token }).exec();
      if(tokenExists)
      {
        throw new Error("Token has been Revoked");
      }
      req.user = await User.findById(decoded.userId).select('-password').exec();

    } catch (error) {
      req.user = {};
    }
  } else {
    req.user = {};
  }
  next();
});

export { authorizetoken };