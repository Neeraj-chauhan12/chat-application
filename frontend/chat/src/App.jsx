import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast';
import { useAuth } from './context/AuthProvider'

const App = () => {

  const [auth, setAuth] = useAuth();
  console.log("Auth state in App.jsx:", auth);
  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={auth ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
