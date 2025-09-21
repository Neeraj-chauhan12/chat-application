import React from "react";
import pic from "../../public/pr.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userSocketContext } from "../context/SocketProvider";
import { useAuth } from "../context/AuthProvider";
const Profile = () => {
  const { onlineUsers } = userSocketContext();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("data");
    window.location.reload();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black text-white">
      <div className="h-full  w-full flex flex-col  justify-center items-center">
        <div className="relative">
          <img
            className="h-32 w-32  rounded-full mb-4"
            src={pic}
            alt="Profile"
          />
          {onlineUsers.includes(
            JSON.parse(localStorage.getItem("data")).user._id
          ) && (
            <div className="h-3 w-3 absolute bg-green-500 rounded-full top-0 right-0 border-2 border-white"></div>
          )}
        </div>
        <h1 className="text-2xl font-bold mb-4">{auth.user.username}</h1>
        <h1 className="text-xl font-semibold mb-2">{auth.user.email}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 mt-3 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
