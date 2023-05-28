import jwt from 'jsonwebtoken';

let daysToExpireAfter=30;

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: `${daysToExpireAfter}d`,
  });

  return token;
};

export default generateToken;