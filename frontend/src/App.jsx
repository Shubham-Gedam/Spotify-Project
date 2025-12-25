
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import ArtistDashboard from './pages/artist/ArtistDashboard';
import UploadMusic from './pages/artist/UploadMusic'
import Home from './pages/Home';
import MusicPlayer from './pages/music/MusicPlayer';


const App = () => {
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
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/artist/dashboard" element={<ArtistDashboard />} />
        <Route path="/artist/dashboard/upload-music" element={<UploadMusic />} />
        <Route path="/music/:id" element={<MusicPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;