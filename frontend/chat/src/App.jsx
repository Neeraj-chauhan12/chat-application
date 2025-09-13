import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
