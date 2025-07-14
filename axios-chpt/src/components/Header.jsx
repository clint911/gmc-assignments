// src/components/Header.js
import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <div className="logo-icon"></div>
        <h1>CryptoTracker</h1>
      </div>
      <nav className="navigation">
        <a href="#dashboard">Dashboard</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#news">News</a>
        <a href="#settings">Settings</a>
      </nav>
      <div className="user-profile">
        <div className="profile-icon"></div>
        <span>My Account</span>
      </div>
    </header>
  );
};

export default Header;
