const express = require('express');
const Server=require('socket.io')
const http=require('http');
const app = express();

const server=http.createServer(app);
const io= Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
});

//real time messaging

const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};

const users={};

io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);
    const userId=socket.handshake.query.userId;
    console.log("User ID from query:",userId);
    //users[userId]=socket.id;
    if(userId){
        users[userId]=socket.id;
        console.log("Current users:",users);
    }

    io.emit("welcome",Object.keys(users )); // Send list of userIds

    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
        delete users[userId];
        io.emit("welcome",Object.keys(users ));
    });})

    module.exports={
    app,server,io,getReceiverSocketId
    }