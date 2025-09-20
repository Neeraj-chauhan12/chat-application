import axios, { all } from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BACKEND_URL } from '../utils/utils';
import { userSocketContext } from '../context/SocketProvider';
import sound from "../assets/bell-notification-337658.mp3"

const GetMessages = ({ user }) => {

 const { socket } = userSocketContext();
  const [messages,setMessages]=useState([])

  useEffect(() => {
    socket?.on('receive-message', (newMessage) => {
       const notification=new Audio(sound)
       notification.play();
      console.log('Message received:', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      // Here you can update your message list state to include the new message
    });
    return () => { socket?.off('newMesage'); }

  }, [socket, messages,setMessages]);

    useEffect(() => {
        const getMessages = async () => {
            if (user) {
                const response= await axios.get(`${BACKEND_URL}/api/message/messages/${user._id}`, {
                    withCredentials: true,
                });
                setMessages(response.data);
            }
        };

        getMessages();
    }, [user]);

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);



        const currentUserId = JSON.parse(localStorage.getItem("data")).user._id;
        return (
            <div>
                {messages.map((message) => {
                    const isCurrentUser = message.senderId === currentUserId;
                    return (
                        <div
                            key={message._id}
                            ref={lastMsgRef}
                            className={`h-[5%] w-full my-2 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`h-full max-w-[50%] rounded-t-2xl ${isCurrentUser ? 'rounded-l-2xl bg-green-400' : 'rounded-r-2xl bg-blue-400'} text-white px-5 py-2 flex items-center justify-start`}
                            >
                                <h1>{message.message}</h1>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
}

export default GetMessages
