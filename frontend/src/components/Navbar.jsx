import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className="spotify-navbar">
      {/* LEFT: Logo and Home */}
      <div className="nav-left">
        <div className="home-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M12.5 3.11l9.15 8.13c.33.3.12.86-.32.86H19v7.9a1 1 0 0 1-1 1h-4v-6h-4v6H6a1 1 0 0 1-1-1v-7.9H2.67c-.44 0-.65-.56-.32-.86l9.15-8.13a1 1 0 0 1 1.34 0z"/>
          </svg>
        </div>
      </div>

      {/* CENTER: Search Bar */}
      {/* <div className="nav-center">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="What do you want to play?" 
            className="search-input"
          />
          <div className="search-divider"></div>
          <span className="browse-icon">📁</span>
        </div>
      </div> */}

      {/* RIGHT: Links and Auth */}
      <div className="nav-right">
        <div className="nav-links">
          <a href="#">Premium</a>
          <a href="#">Support</a>
          <a href="#">Download</a>
        </div>
        
        <div className="divider"></div>

        

        <button className="signup-btn" onClick={() => navigate("/register")}>Register</button>
        <button className="login-btn" onClick={() => navigate("/login")}>Log in</button>
      </div>
    </nav>
  );
};

export default Navbar;