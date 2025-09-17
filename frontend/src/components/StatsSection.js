import React from 'react';
import './StatsSection.css';

const StatsSection = () => {
  const stats = [
    {
      icon: 'fas fa-users',
      number: '50,000+',
      label: 'Students Guided',
      color: 'primary'
    },
    {
      icon: 'fas fa-graduation-cap',
      number: '25+',
      label: 'Degree Programs',
      color: 'secondary'
    },
    {
      icon: 'fas fa-briefcase',
      number: '500+',
      label: 'Career Paths',
      color: 'accent'
    },
    {
      icon: 'fas fa-star',
      number: '4.9/5',
      label: 'User Rating',
      color: 'warning'
    }
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <h2>
            <i className="fas fa-chart-line"></i>
            Platform Impact
          </h2>
          <p>Helping students make informed career decisions worldwide</p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">
                <i className={stat.icon}></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;