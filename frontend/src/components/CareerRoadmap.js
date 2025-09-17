import React, { useState } from 'react';

const CareerRoadmap = ({ selectedDegree, careerPaths }) => {
  const [selectedCareer, setSelectedCareer] = useState('');
  const [customCareer, setCustomCareer] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoadmapGeneration = async (career) => {
    const careerToUse = career || customCareer;
    if (!careerToUse.trim()) return;
    
    setSelectedCareer(careerToUse);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/career-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ career: careerToUse, degree: selectedDegree })
      });

      const data = await response.json();
      setRoadmap(data.roadmap || data.error);
    } catch (error) {
      setRoadmap('Roadmap unavailable. Please try again later.');
    }
    setLoading(false);
  };

  const formatRoadmapContent = (content) => {
    if (!content) return '';
    
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/#{1,6}\s*(.*?)\n/g, '<h3>$1</h3>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><h3>/g, '<h3>')
      .replace(/<\/h3><\/p>/g, '</h3>')
      .replace(/\n-\s*(.*?)(?=\n|$)/g, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\d+\.\s*(.*?)(?=\n|$)/g, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
  };

  if (!selectedDegree || !careerPaths.careers) {
    return (
      <div className="roadmap-placeholder">
        <div className="empty-icon">
          <i className="fas fa-map"></i>
        </div>
        <h3>Select a degree first</h3>
        <p>Choose a degree to see detailed career roadmaps</p>
      </div>
    );
  }

  return (
    <div className="career-roadmap">
      <div className="section-header">
        <h2>
          <i className="fas fa-map"></i>
          Career Roadmaps
        </h2>
        <p>Get detailed career progression paths for {selectedDegree}</p>
      </div>

      <div className="career-options">
        <h3>Select a Career Path:</h3>
        <div className="career-buttons">
          {careerPaths.careers.map(career => (
            <button
              key={career}
              className={`career-option ${selectedCareer === career ? 'active' : ''}`}
              onClick={() => handleRoadmapGeneration(career)}
            >
              {career}
            </button>
          ))}
        </div>
        
        <div className="custom-career-input">
          <h4>Or enter a custom career:</h4>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter any career you're interested in..."
              value={customCareer}
              onChange={(e) => setCustomCareer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleRoadmapGeneration()}
            />
            <button 
              className="generate-btn"
              onClick={() => handleRoadmapGeneration()}
              disabled={!customCareer.trim() || loading}
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-roadmap">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p>Generating detailed roadmap for {selectedCareer}...</p>
        </div>
      )}

      {roadmap && !loading && (
        <div className="roadmap-result">
          <h3>
            <i className="fas fa-bullseye"></i>
            {selectedCareer} Career Roadmap
          </h3>
          <div 
            className="roadmap-content"
            dangerouslySetInnerHTML={{ __html: formatRoadmapContent(roadmap) }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CareerRoadmap;