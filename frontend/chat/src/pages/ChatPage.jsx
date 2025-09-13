import React from 'react'
import AllUsers from '../components/AllUsers'
import Messages from '../components/Messages'
import Profile from '../components/Profile'

const ChatPage = () => {
  return (
    <div className='h-screen w-screen flex text-white'>
        <div className='h-full w-[20%] bg-gradient-to-r from-gray-500 to-gray-700 border-r-2 border-gray-300'>
         <AllUsers />
        </div>
        <div className='h-full w-[60%] bg-gradient-to-r from-gray-700 to-gray-900 border-r-2 border-gray-300'>
            <Messages />
        </div>

        <div className='h-full w-[20%] border-r-2 border-gray-300'>
            <Profile />
        </div>
       
       

      
    </div>
  )
}

export default ChatPage
