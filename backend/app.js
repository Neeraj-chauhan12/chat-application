const express = require('express');
const app=require('./server').app;
const server=require('./server').server;
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/dbconnection/db');
const userRoutes = require('./src/routes/userRoutes');
const messageRoutes = require('./src/routes/messageRoute');
const cookieParser = require('cookie-parser');

dotenv.config();



app.use(cors({
    origin: 'baatcheet12.netlify.app',
    credentials: true,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','Authorization']
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user', userRoutes);
app.use('/api/message',messageRoutes);



const PORT = process.env.PORT || 5000;
connectDB();
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
