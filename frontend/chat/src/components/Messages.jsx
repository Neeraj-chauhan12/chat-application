import React, { use } from 'react';
import { IoSend } from 'react-icons/io5';
import GetMessages from './GetMessages';
import Typedtext from './Typedtext';

const Messages = ({ user }) => {

  

  return (
    <div className="h-full w-full">
      <div className="h-[10%] w-full border-b-2 border-gray-300 flex items-center justify-center">
        <h1>{user ? user.username : 'Select a user'}</h1>
      </div>
      <div className="messages h-[80%] w-full overflow-y-scroll py-3 px-1">
        {/* Example messages, replace with dynamic messages for selected user */}

       <GetMessages user={user} />

      </div>
      <div className="h-[10%] w-full border-t-2 border-gray-300 ">

      <Typedtext  user={user} />
      </div>
    </div>
  );
};

export default Messages;
