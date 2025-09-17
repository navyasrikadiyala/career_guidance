import React, { useState } from 'react';

const SkillsAssessment = ({ selectedDegree }) => {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [assessment, setAssessment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAssessment = async () => {
    if (!skills.trim() || !interests.trim() || !selectedDegree) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/skills-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, interests, degree: selectedDegree })
      });

      const data = await response.json();
      setAssessment(data.assessment || data.error);
    } catch (error) {
      setAssessment('Assessment unavailable. Please try again later.');
    }
    setLoading(false);
  };

  const formatAssessment = (text) => {
    const sections = text.split('\n\n').filter(section => section.trim());
    return sections.map((section, index) => {
      const lines = section.split('\n').filter(line => line.trim());
      const title = lines[0]?.replace(/\*\*/g, '').replace(/#+/g, '').trim();
      const content = lines.slice(1);
      
      return (
        <div key={index} className="assessment-section">
          <h4 className="assessment-title">{title}</h4>
          <div className="assessment-items">
            {content.map((item, itemIndex) => (
              <div key={itemIndex} className="assessment-item">
                {item.replace(/•/g, '').replace(/\*/g, '').trim()}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="skills-assessment">
      <div className="section-header">
        <h2>
          <i className="fas fa-bullseye"></i>
          Skills Assessment
        </h2>
        <p>Get personalized skill gap analysis and development recommendations</p>
      </div>

      <div className="assessment-form">
        <div className="form-group">
          <label>Current Skills</label>
          <textarea
            placeholder="List your current skills (e.g., programming, communication, problem-solving, leadership)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Interests & Goals</label>
          <textarea
            placeholder="Describe your interests and career goals"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            rows={3}
          />
        </div>

        <button 
          className="assessment-btn"
          onClick={handleAssessment}
          disabled={!skills.trim() || !interests.trim() || !selectedDegree || loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Analyzing...
            </>
          ) : (
            <>
              <i className="fas fa-chart-line"></i>
              Get Skills Assessment
            </>
          )}
        </button>
      </div>

      {assessment && (
        <div className="assessment-result">
          <h3>
            <i className="fas fa-clipboard-check"></i>
            Your Skills Assessment
          </h3>
          <div className="result-content">{formatAssessment(assessment)}</div>
        </div>
      )}
    </div>
  );
};

export default SkillsAssessment;