
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import ArtistDashboard from './pages/artist/ArtistDashboard';
import UploadMusic from './pages/artist/UploadMusic'
import Home from './pages/Home';
import MusicPlayer from './pages/music/MusicPlayer';
import {io} from 'socket.io-client'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io("http://localhost:3002",{
      withCredentials:true
    })
    setTimeout(() => {
    setSocket(newSocket)
  }, 0)

    newSocket.on("play",(data)=>{
      const musicId = data.musicId

      window.location.href = `/music/${musicId}`
    })
  },[])


  useEffect(() => {
    const setSystemTheme = () => {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };
    setSystemTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', setSystemTheme);
    return () => mediaQuery.removeEventListener('change', setSystemTheme);
  }, []);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artist/dashboard" element={<ArtistDashboard />} />
        <Route path="/artist/dashboard/upload-music" element={<UploadMusic />} />
        <Route path="/music/:id" element={<MusicPlayer />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;