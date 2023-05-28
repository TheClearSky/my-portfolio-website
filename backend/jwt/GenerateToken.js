import jwt from 'jsonwebtoken';

let daysToExpireAfter=30;

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: `${daysToExpireAfter}d`,
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.CURRENT_ENVIRONMENT === 'PROD', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: daysToExpireAfter * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;