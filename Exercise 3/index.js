import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import authRout from "./routes/auth.js"
import adminRout from "./routes/Admin.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/auth', authRout);
app.use("/admin", adminRout);
app.use(errorHandler);
mongoose.connect(process.env.MONGO_URL)
   .then(()=> {
    console.log('✅ MongoDB connected');
    app.listen(PORT, ()=> {
        console.log(`🚀 server at http://localhost:${PORT} connected successfully`);
    })
   })
   .catch((error)=> {
   console.error('❌ DB connection error:', err)
   })

  