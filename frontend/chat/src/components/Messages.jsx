import React from 'react';
import { IoSend } from 'react-icons/io5';

const Messages = ({ user }) => {
  const handleMessageSend = () => {
    // Logic to send the message
    console.log('Message sent!');
  };

  const handleMessageKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  return (
    <div className="h-full w-full">
      <div className="h-[10%] w-full border-b-2 border-gray-300 flex items-center justify-center">
        <h1>{user ? user.username : 'Select a user'}</h1>
      </div>
      <div className="messages h-[80%] w-full overflow-y-scroll py-3 px-1">
        {/* Example messages, replace with dynamic messages for selected user */}
        <div className="h-[10%] w-full flex justify-end ">
          <div className="h-full w-[50%] rounded-t-2xl rounded-l-2xl border-b-2 bg-green-400 text-white px-5 py-2 flex items-center justify-start">
            <h1>Message 1</h1>
          </div>
        </div>
        <div className="h-[10%] w-[50%] rounded-t-2xl rounded-r-2xl border-b-2 bg-red-400 text-white px-5 py-2 flex items-center justify-start">
          <h1>Message 2</h1>
        </div>
        <div className="h-[10%] w-full flex justify-end">
          <div className="h-full w-[50%] rounded-t-2xl rounded-l-2xl border-b-2 bg-green-400 text-white px-5 py-2 flex items-center justify-start">
            <h1>Message 1</h1>
          </div>
        </div>
        <div className="h-[10%] w-[50%] rounded-t-2xl rounded-r-2xl border-b-2 bg-red-400 text-white px-5 py-2 flex items-center justify-start">
          <h1>Message 2</h1>
        </div>
      </div>
      <div className="h-[10%] w-full border-t-2 border-gray-300 flex items-center justify-center">
        <input
          onKeyPress={handleMessageKeyPress}
          className="h-10 w-[90%] rounded-full border-2 border-gray-300 px-5"
          type="text"
          placeholder="Type a message..."
        />
        <button onClick={handleMessageSend} className="ml-2 text-blue-500">
          <IoSend size={35} />
        </button>
      </div>
    </div>
  );
};

export default Messages;
