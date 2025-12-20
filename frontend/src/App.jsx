
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';


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
        <Route path="/" element={<div className='bg-red-500'>App</div>} />
      </Routes>
    </Router>
  );
}

export default App;