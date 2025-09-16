import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../utils/utils';

const GetMessages = ({ user }) => {


    const [messages, setMessages] =useState([]); 

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

    const senderId=JSON.parse(localStorage.getItem("data"))
    console.log("sender id from local storage",senderId.user._id);
     console.log("user id",user?._id);
    
     const messageStyle = senderId.user._id === user?._id;
     console.log("Message Style:", messageStyle);
  return (
    <div>

        {
            messages.map((message) => (
                <div key={message._id} className={`h-[5%] w-full my-2 flex ${messageStyle ? 'justify-start' : 'justify-end'}`}>
                    <div className={`h-full max-w-[50%] rounded-t-2xl ${messageStyle ? 'rounded-r-2xl bg-gray-400 rounded-t-2xl' : 'rounded-l-2xl rounded-t-2xl bg-blue-300'} text-white px-5 py-2 flex items-center justify-start`}>
                        <h1>{message.message}</h1>
                    </div>
                </div>
            ))}
       {/* <div className="h-[5%] w-full flex justify-end ">
          <div className="h-full max-w-[50%] rounded-t-2xl rounded-l-2xl border-b-2 bg-green-400 text-white px-5 py-2 flex items-center justify-start">
            <h1>Message 1</h1>
          </div>
        </div>
        <div className="h-[5%] w-full flex justify-start">
         <div className="h-full max-w-[50%] rounded-t-2xl rounded-r-2xl border-b-2 bg-green-400 text-white px-5 py-2 flex items-center justify-start">
            <h1>Message 2</h1>
          </div>
        </div> */}
    </div>
  )
}

export default GetMessages
