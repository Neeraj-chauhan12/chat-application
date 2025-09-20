import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../utils/utils';
import { userSocketContext }  from '../context/SocketProvider';


const AllUsers = ({ onUserSelect }) => {
    const [AllUser, setAllUser] = useState([]);
    const {socket, onlineUsers} = userSocketContext();
    // Remove isOnline from here; check per user below

    useEffect(() => {
        try {
            axios.get(`${BACKEND_URL}/api/user/profile`, {
                withCredentials: true,
            }).then((response) => {
                setAllUser(response.data.user);
            });
        } catch (error) {
            console.log('Error while fetching all users', error);
        }
    }, []);

    return (
        <div className="h-full w-full">
            <div className="h-[10%] w-full border-b-2 border-gray-300 flex items-center justify-start px-3">
                <input className="border-2 border-gray-300 rounded-lg p-2 w-[80%]" type="text" placeholder="Search users..." />
            </div>
            {/* List of users */}
            <div className="h-[5%] w-full border-b-2 border-gray-300 flex items-center justify-center">
                <h1>All Users</h1>
            </div>
            <div className="users h-[85%] w-full overflow-y-scroll">
                {AllUser.map((user) => {
                    const isOnline = onlineUsers.includes(user._id);
                    return (
                        <div
                            key={user._id}
                            className="h-[10%] w-full flex bg-gray-600 items-center justify-start px-3 hover:bg-gray-800 cursor-pointer"
                            onClick={() => onUserSelect && onUserSelect(user)}
                        >
                            <div className="h-10 w-10 relative rounded-full bg-gray-500 flex items-center justify-center text-white mr-3">
                                {isOnline && <div className='h-3 w-3 bg-green-500 absolute rounded-full top-0 right-0 border-2 border-white'></div>}
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{user.username}</span>
                                <span className="text-xs text-gray-400">{user.email}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllUsers;
