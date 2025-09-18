import {  createContext,  useEffect, useState } from 'react';
import {useAuth} from './AuthProvider'
import { io } from 'socket.io-client';



const socketContext = createContext();

export const SocketProvider =({children})=>{
     
    const [socket, setSocket] = useState(null);
    const [authUser]=useAuth();
 
     useEffect(() => {
        if (authUser) {
          const newSocket = io('http://localhost:3000', {
            query: { userId: authUser._id },
          });
          setSocket(newSocket);
        }
      }, [authUser]);

    return(
        <socketContext.Provider value={{ socket }}>
            {children}
            </socketContext.Provider>
    );  }