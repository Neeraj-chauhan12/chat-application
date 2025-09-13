import React from 'react'

const Messages = () => {
  return (
    <div className='h-full w-full '>
        <div className='h-[10%] w-full border-b-2 border-gray-300 flex items-center justify-center'>
            <h1>Neeraj chauhan</h1>

        </div>

        <div className='messages h-[90%] w-full overflow-y-scroll py-3 px-1'>

            <div className='h-[10%] w-full flex justify-end '>
              <div className='h-full w-[50%] rounded-t-2xl rounded-l-2xl border-b-2 bg-green-400 text-white px-5 py-2 flex items-center justify-start'>
                <h1>Message 1</h1>
              </div>
            </div>
            
            
            <div className='h-[10%] w-[50%] rounded-t-2xl rounded-r-2xl border-b-2 bg-red-400 text-white px-5 py-2 flex items-center justify-start'>
                <h1>Message 2</h1>
            </div>

             <div className='h-[10%] w-full flex justify-end'>
              <div className='h-full w-[50%] rounded-t-2xl rounded-l-2xl border-b-2 bg-green-400 text-white px-5 py-2 flex items-center justify-start'>
                <h1>Message 1</h1>
              </div>
            </div>

              <div className='h-[10%] w-[50%] rounded-t-2xl rounded-r-2xl border-b-2 bg-red-400 text-white px-5 py-2 flex items-center justify-start'>
                <h1>Message 2</h1>
            </div>
           
        </div>
    </div>
  )
}

export default Messages
