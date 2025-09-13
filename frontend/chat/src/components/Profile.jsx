import React, { useState } from 'react'
import pic from '../../public/pr.jpg'
const Profile = () => {
  
    const [profileData, setProfileData] = useState(null);
    const data=localStorage.getItem("data");
    setProfileData(JSON.parse(data));
    const data1=JSON.parse(data);
    console.log("Profile data from localStorage:", data1);

  return (
    <div className='h-screen w-full flex justify-center items-center bg-black text-white'>

        <div className='h-full w-full flex flex-col justify-center items-center'>
            <div>
                <img className='h-32 w-32 rounded-full mb-4' src={pic} alt="Profile" />
            </div>
            <h1 className='text-2xl font-bold mb-4'>{profileData.user.username}</h1>
            <h1 className='text-xl font-semibold mb-2'>{profileData.user.email}</h1>

    </div>
      
    </div>
  )
}

export default Profile
