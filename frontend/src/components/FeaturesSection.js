import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'fas fa-search',
      title: 'Career Exploration',
      description: 'Discover comprehensive career paths for every degree with detailed insights into job opportunities, salary expectations, and growth prospects.',
      color: 'primary'
    },
    {
      icon: 'fas fa-robot',
      title: 'AI-Powered Guidance',
      description: 'Get personalized career recommendations based on your interests, skills, and academic background using advanced AI technology.',
      color: 'secondary'
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Smart Comparison',
      description: 'Compare multiple degrees side-by-side to make informed decisions about your academic and career future.',
      color: 'accent'
    },
    {
      icon: 'fas fa-bullseye',
      title: 'Skills Assessment',
      description: 'Identify skill gaps and get personalized development plans to enhance your career readiness and competitiveness.',
      color: 'info'
    },
    {
      icon: 'fas fa-map',
      title: 'Career Roadmaps',
      description: 'Access detailed step-by-step career progression paths with timelines, milestones, and actionable next steps.',
      color: 'warning'
    },
    {
      icon: 'fas fa-comments',
      title: '24/7 Chat Support',
      description: 'Get instant answers to your career questions with our intelligent chatbot available round the clock.',
      color: 'danger'
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2>
            <i className="fas fa-star"></i>
            Platform Features
          </h2>
          <p>Everything you need to make informed career decisions</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className={`feature-card ${feature.color}`}>
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="feature-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;