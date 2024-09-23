const express = require('express');
require('dotenv').config();
const users = require("./routes/UsersRoutes/usersRoutes")
const authRoutes = require('./routes/authRoutes/authroutes');
const incidentRoutes = require('./routes/incidentRoutes/incidentRoutes');
const cors = require("cors")
const app = express();


app.use(cors());


app.use(express.json());



app.use("/api",users)
app.use('/api', authRoutes);
app.use('/api',incidentRoutes );

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})