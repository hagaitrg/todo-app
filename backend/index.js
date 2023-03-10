const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'https://localhost:8080'
};

app.use(cors(corsOptions))

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.json({message:"Welcome to hagai's todo app"});
})

const todoRoute = require('./routes/todo')
app.use("/api/v1/todos", todoRoute)

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});