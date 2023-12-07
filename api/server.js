const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const route = require('./route');

mongoose.connect("mongodb://my_db:27017/test");
mongoose.connection.on("error",error=>{
    console.log("Database connetion failed!",error)
});
mongoose.connection.once("open",()=>{
    console.log("Connected to Database")
})

app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    )
    next()
})
app.use('/api', route);
app.get('/message', (req, res) => {
    res.json({ message: "Hello from server message!" });
});

app.listen(4000, () => {
    console.log(`Server is running on port 4000.`);
  });