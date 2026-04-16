import express from "express";
import { logIn, register } from "../controller/auth.js";
import { protectedRout } from "../middleware/authentication.js";
const router = express.Router();

// register and logIn

router.post('/register', register);
router.post('/login', logIn)

// protected Rout

router.get("/profile", protectedRout, (req, res)=> {
    res.json(req.user);
})
export default router;