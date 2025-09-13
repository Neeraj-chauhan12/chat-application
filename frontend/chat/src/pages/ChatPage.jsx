
import React, { useState } from 'react';
import AllUsers from '../components/AllUsers';
import Messages from '../components/Messages';
import Profile from '../components/Profile';
import { IoMdClose } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // Handler for selecting a user
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  // Handler for going back to user list on mobile
  const handleBack = () => {
    setSelectedUser(null);
  };

  // Handler for profile icon click
  const handleProfileIconClick = () => {
    setShowProfile(true);
  };
  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <div className="h-screen w-screen flex md:flex-row flex-col text-white relative">
      {/* Mobile: AllUsers first, profile icon in corner */}
      <div className={`md:w-[20%] w-full min-h-screen md:h-full bg-gradient-to-r from-gray-500 to-gray-700 border-r-2 border-gray-300 ${selectedUser ? 'hidden md:block' : 'block'}`}>
        {/* Profile icon at top right on mobile */}
        <div className="md:hidden flex justify-end p-2 absolute top-2 right-2 z-10">
          <button onClick={handleProfileIconClick} className="rounded-full bg-gray-800 p-1 shadow-lg">
            <img src='' alt="Profile" className="h-10 w-10 rounded-full" />
          </button>
        </div>
        {/* AllUsers: pass handler for selection */}
        <AllUsers onUserSelect={handleUserSelect} />
      </div>

      {/* Messages: show only if user selected (mobile), always in center (desktop) */}
      <div className={`md:w-[60%] w-full md:h-full min-h-full bg-gradient-to-r from-gray-700 to-gray-900 md:border-r-2 border-gray-300 ${selectedUser ? 'block' : 'hidden md:block'}`}>
        {/* Back button for mobile */}
        <div className="md:hidden flex items-center p-2 relative">
          <button onClick={handleBack} className="bg-gray-800 text-white px-2 py-2 absolute top-10  rounded-full mr-2"><IoArrowBackSharp /></button>
          <span className="font-bold">{selectedUser ? selectedUser.name : ''}</span>
        </div>
        {/* Messages component: pass selected user */}
        {selectedUser && <Messages user={selectedUser} />}
      </div>

      {/* Profile: show only on desktop */}
      <div className="md:w-[20%] w-0 md:block hidden md:border-r-2 border-gray-300">
        <Profile />
      </div>

      {/* Profile modal for mobile */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl  w-[90vw] max-w-md relative">
            <button onClick={handleCloseProfile} className="absolute top-5 right-2 bg-gray-500 rounded-full text-xl text-white font-bold"><IoMdClose /></button>
            <Profile />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
