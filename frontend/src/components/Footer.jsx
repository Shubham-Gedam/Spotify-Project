import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="spotify-footer">
      <div className="footer-container">
        {/* Link Columns */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">For the Record</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Communities</h3>
            <ul>
              <li><a href="#">For Artists</a></li>
              <li><a href="#">Developers</a></li>
              <li><a href="#">Advertising</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Vendors</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Useful links</h3>
            <ul>
              <li><a href="#">Support</a></li>
              <li><a href="#">Free Mobile App</a></li>
              <li><a href="#">Popular by Country</a></li>
              <li><a href="#">Import your music</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Spotify Plans</h3>
            <ul>
              <li><a href="#">Premium Lite</a></li>
              <li><a href="#">Premium Standard</a></li>
              <li><a href="#">Premium Platinum</a></li>
              <li><a href="#">Premium Student</a></li>
              <li><a href="#">Spotify Free</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="footer-socials">
          <a href="#" className="social-icon"><span></span></a>
          <a href="#" className="social-icon"><span></span></a>
          <a href="#" className="social-icon"><span></span></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;