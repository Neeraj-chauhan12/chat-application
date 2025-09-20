import {  createContext,  useContext,  useEffect, useState } from 'react';
import {useAuth} from './AuthProvider'
import { io } from 'socket.io-client';

const socketContext = createContext();
export const userSocketContext =()=>{
  return useContext(socketContext);
}


export const SocketProvider =({children})=>{
     
    const [socket, setSocket] = useState(null); 
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [auth]=useAuth();
 
     useEffect(() => {
        if (auth) {
          const socket = io('http://localhost:3000', {
            query: { 
              userId: auth.user._id 
            },
          });
          setSocket(socket);
          socket.on('welcome', (users) => {
            setOnlineUsers(users);
            console.log('Online users:', users);
          });
          return () => socket.close();
          
        }
        else {
          if (socket) {
            socket.close();
            setSocket(null);
          }
        }
      }, [auth]);

    return(
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
            </socketContext.Provider>
    );  }