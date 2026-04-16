import User from "../model/user.js"
import { JwtToken } from "../utils/jwtToken.js";

export const register = async(req, res, next) => {
    let {name, email, password, role} = req.body;
    try {
        if(!name || !email || !password || !role) {
             return res.status(400).json({ message: "All fields are required" });
        }
        email = email.toLowerCase();
        const exist = await User.findOne({email});
        if(exist) {
             return res.status(400).json({ message: "Email already exists" });
        }

        const user = await User.create({name, email, password, role});
        const token = JwtToken(user._id);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                // password: user.password,
                role: user.role
            }
        })
    } catch (error) {
        next(error);
    }
}

export const logIn = async (req, res, next)=> {
let {email, password} = req.body;
try {
    if(!email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }
    email = email.toLowerCase();
    const user = await User.findOne({email});
    if(!user || !(await user.comparePassword(password))) {
          return res.status(401).json({ message: "invalid user or password" });
    }
    const token = JwtToken(user._id);
    return res.json({
        token,
        user: {
             id: user._id,
                name: user.name,
                email: user.email,
                // password: user.password,
                role: user.role
        }
    })
} catch (error) {
    next(error);
}
}