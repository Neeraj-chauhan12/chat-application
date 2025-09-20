import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { IoSend } from 'react-icons/io5';
import { BACKEND_URL } from '../utils/utils';
import { userSocketContext } from '../context/SocketProvider';

const Typedtext = ({ user }) => {
  const { socket } = userSocketContext();
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket?.on('receive-message', (newMessage) => {
      console.log('Message received:', newMessage);
      setMessage((prevMessages) => [...prevMessages, newMessage]);
      // Here you can update your message list state to include the new message
    });
    return () => { socket?.off('receive-message'); }

  }, [socket, message,setMessage]);


      const handleMessageSend = async (e) => {
        e.preventDefault();
        
        const response=await axios.post(`${BACKEND_URL}/api/message/send/${user._id}`,
       {
          message: message,
        },
        {
          withCredentials: true,
        }
        );
        setMessage([...message, response.data.message]);
         setMessage(''); // Clear the input field after sending
  };


  const handleMessageKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSend(e);
    }
  };
  return (
    <>
        <form  onSubmit={handleMessageSend} className='h-full w-full flex items-center justify-center'>
          <input
                  onKeyPress={handleMessageKeyPress}
                  className="h-10 w-[90%] rounded-full border-2 border-gray-300 px-5"
                  type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={handleMessageSend} className="ml-2 text-blue-500">
                  <IoSend size={35} />
                </button>

                </form>
      
    </>
  )
}

export default Typedtext
