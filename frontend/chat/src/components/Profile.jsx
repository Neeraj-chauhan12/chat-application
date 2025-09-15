import React from 'react'
import pic from '../../public/pr.jpg'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Profile = () => {
   
  const navigate = useNavigate();
   const data=localStorage.getItem("data")
   const userData = JSON.parse(data);
   const username = JSON.stringify(userData.user.username);
   const email = JSON.stringify(userData.user.email);

    const handleLogout = () => {
       localStorage.removeItem("data");
       window.location.reload();
       toast.success("Logged out successfully");
       navigate('/login');
    }

  return (
    <div className='h-screen w-full flex justify-center items-center bg-black text-white'>

        <div className='h-full w-full flex flex-col justify-center items-center'>
            <div>
                <img className='h-32 w-32 rounded-full mb-4' src={pic} alt="Profile" />
            </div>
            <h1 className='text-2xl font-bold mb-4'>{username}</h1>
            <h1 className='text-xl font-semibold mb-2'>{email}</h1>
            <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 mt-3 rounded'>Logout</button>

    </div>
      
    </div>
  )
}

export default Profile
