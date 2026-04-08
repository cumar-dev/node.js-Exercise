require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const booksRouter = require('./router/Books');

const app = express();
app.use(express.json());
app.use("/books", booksRouter);
mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("mongoDB connected successfully"))
    .catch((error)=> console.log('connection error', error));

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`)
})
    
