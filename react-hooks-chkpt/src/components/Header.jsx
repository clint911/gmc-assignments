import React from 'react';
import { Link } from 'react-router';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1>Studio Ghibli Library</h1>
      </Link>
      <div className="studio-logo">風の谷</div>
    </header>
  );
};

export default Header;