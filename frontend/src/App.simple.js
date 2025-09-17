import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [degrees] = useState(['B.A.', 'B.Sc.', 'B.Com.']);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [activeTab, setActiveTab] = useState('explore');

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>🎓 CareerPath</h1>
          <span>Your Future Starts Here</span>
        </div>
        <div className="nav-tabs">
          <button 
            className={activeTab === 'explore' ? 'active' : ''}
            onClick={() => setActiveTab('explore')}
          >
            🔍 Explore Careers
          </button>
          <button 
            className={activeTab === 'compare' ? 'active' : ''}
            onClick={() => setActiveTab('compare')}
          >
            📊 Compare (0)
          </button>
          <button 
            className={activeTab === 'guidance' ? 'active' : ''}
            onClick={() => setActiveTab('guidance')}
          >
            🤖 AI Guidance
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'explore' && (
          <div className="explore-section">
            <div className="hero">
              <h2>Choose Your Academic Path</h2>
              <p>Discover endless possibilities with every degree choice</p>
            </div>
            
            <div className="degree-selector">
              <h3>Available Degrees</h3>
              <div className="degree-grid">
                {degrees.map(degree => (
                  <div 
                    key={degree} 
                    className={`degree-card ${selectedDegree === degree ? 'selected' : ''}`}
                    onClick={() => setSelectedDegree(degree)}
                  >
                    <div className="degree-icon">
                      {degree === 'B.A.' ? '📚' : degree === 'B.Sc.' ? '🔬' : '💼'}
                    </div>
                    <h4>{degree}</h4>
                    <p>{degree === 'B.A.' ? 'Arts & Humanities' : degree === 'B.Sc.' ? 'Science & Research' : 'Commerce & Business'}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedDegree && (
              <div className="career-showcase">
                <div className="showcase-header">
                  <h3>🎯 {selectedDegree} Career Opportunities</h3>
                </div>
                <p>Career paths will be loaded here...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="compare-section">
            <div className="section-header">
              <h2>📊 Degree Comparison</h2>
              <p>Compare different degrees side by side</p>
            </div>
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No degrees to compare yet</h3>
              <p>Go to Explore Careers and add degrees to comparison</p>
            </div>
          </div>
        )}

        {activeTab === 'guidance' && (
          <div className="guidance-section">
            <div className="section-header">
              <h2>🤖 AI Career Guidance</h2>
              <p>Get personalized career recommendations based on your interests</p>
            </div>
            <p>AI guidance will be available here...</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 CareerPath Platform | Empowering Students to Make Informed Career Choices</p>
      </footer>
    </div>
  );
}

export default App;