import User from "../model/user.js"
import jwt from "jsonwebtoken"
export const protectedRout = async (req, res, next)=> {
const token = req.headers.authorization.split(" ")[1];
console.log("token", req.headers.authorization);
if(!token) {
   return res.status(400).json({message: "no token provided"});
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log("verified decode", decoded);
        req.user = await User.findById(decoded.id).select("-password");
        console.log("user reading from databse :", req.user);
        next();
} catch (error) {
      res.status(401).json({message: "unAuthorized"});
}
}