import React from 'react'

const Welcome = ({ user }) => {
  return (
    <>
    <div>
        <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
            <h1 className='text-2xl font-bold'>Welcome to the Chat App</h1>
            <p className='text-gray-600'>Select a user to start chatting</p>
        </div>
    </div>
      
    </>
  )
}

export default Welcome
