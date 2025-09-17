import React, { useState } from 'react';
import './Header.css';

const Header = ({ activeTab, setActiveTab, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'degrees', label: 'Degrees', icon: 'fas fa-graduation-cap' },
    { id: 'compare', label: 'Compare', icon: 'fas fa-chart-bar' },
    { id: 'roadmap', label: 'Roadmap', icon: 'fas fa-map' },
    { id: 'guidance', label: 'AI Guide', icon: 'fas fa-robot' },
    { id: 'profile', label: 'Profile', icon: 'fas fa-user' }
  ];

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <div className="brand-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="brand-text">
            <h1>CareerPath</h1>
            <span>Your Future Starts Here</span>
          </div>
        </div>

        <div className="nav-menu">
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="nav-actions">
          <div className="user-info">
            <span className="welcome-text">Hi, {user?.name}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;