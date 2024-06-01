import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from './error.js';

export const verifyToken = async(req,res,next) => {
  const token = req.cookies.access_token;
  if(!token){
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
    if(err) return next(errorHandler(403, 'Forbidden'));
    req.user = user;
    next();
  });
}

// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.cookies.access_token;
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("i am here");
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

export const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access forbidden' });
  }
  next();
};
