import React, { useState, useEffect } from 'react';
import './ImprovedCareerRoadmap.css';

const ImprovedCareerRoadmap = ({ selectedDegree, careerPaths }) => {
  const [selectedCareer, setSelectedCareer] = useState('');
  const [roadmapData, setRoadmapData] = useState(null);
  const [customCareer, setCustomCareer] = useState('');
  const [aiRoadmap, setAiRoadmap] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingCareers, setLoadingCareers] = useState(false);
  const [aiCareers, setAiCareers] = useState([]);

  const careerRoadmaps = {
    'Software Engineer': {
      timeline: [
        { year: '0-1', title: 'Junior Developer', salary: '₹3-6 LPA', skills: ['HTML/CSS', 'JavaScript', 'React/Angular', 'Git'] },
        { year: '1-3', title: 'Software Developer', salary: '₹6-12 LPA', skills: ['Backend Development', 'Database Design', 'API Development', 'Testing'] },
        { year: '3-5', title: 'Senior Developer', salary: '₹12-20 LPA', skills: ['System Design', 'Team Leadership', 'Code Review', 'Mentoring'] },
        { year: '5-8', title: 'Tech Lead', salary: '₹20-35 LPA', skills: ['Architecture Design', 'Project Management', 'Strategic Planning', 'Team Building'] },
        { year: '8+', title: 'Engineering Manager', salary: '₹35-60 LPA', skills: ['People Management', 'Business Strategy', 'Product Vision', 'Organizational Leadership'] }
      ],
      certifications: ['AWS Certified', 'Google Cloud Professional', 'Kubernetes Certified', 'Scrum Master'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Uber']
    },
    'Data Scientist': {
      timeline: [
        { year: '0-1', title: 'Data Analyst', salary: '₹4-7 LPA', skills: ['Python/R', 'SQL', 'Excel', 'Statistics'] },
        { year: '1-3', title: 'Junior Data Scientist', salary: '₹7-15 LPA', skills: ['Machine Learning', 'Data Visualization', 'Feature Engineering', 'Model Building'] },
        { year: '3-5', title: 'Data Scientist', salary: '₹15-25 LPA', skills: ['Deep Learning', 'NLP', 'Computer Vision', 'Big Data Tools'] },
        { year: '5-8', title: 'Senior Data Scientist', salary: '₹25-40 LPA', skills: ['MLOps', 'Model Deployment', 'Team Leadership', 'Business Strategy'] },
        { year: '8+', title: 'Principal Data Scientist', salary: '₹40-70 LPA', skills: ['Research & Innovation', 'Strategic Planning', 'Cross-functional Leadership', 'Product Strategy'] }
      ],
      certifications: ['Google Data Analytics', 'AWS Machine Learning', 'TensorFlow Developer', 'Tableau Certified'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Netflix', 'Spotify', 'LinkedIn']
    },
    'Chartered Accountant': {
      timeline: [
        { year: '0-2', title: 'Article Assistant', salary: '₹2-4 LPA', skills: ['Accounting Standards', 'Taxation', 'Audit Procedures', 'Financial Reporting'] },
        { year: '2-4', title: 'Junior CA', salary: '₹6-12 LPA', skills: ['Advanced Taxation', 'Corporate Law', 'Financial Analysis', 'Compliance'] },
        { year: '4-7', title: 'Senior CA', salary: '₹12-25 LPA', skills: ['Strategic Planning', 'Risk Management', 'Team Leadership', 'Client Relations'] },
        { year: '7-10', title: 'Finance Manager', salary: '₹25-40 LPA', skills: ['Financial Strategy', 'Investment Planning', 'Mergers & Acquisitions', 'Board Reporting'] },
        { year: '10+', title: 'CFO/Partner', salary: '₹40-80 LPA', skills: ['Executive Leadership', 'Strategic Vision', 'Stakeholder Management', 'Business Development'] }
      ],
      certifications: ['CPA', 'CFA', 'FRM', 'CISA'],
      companies: ['Big 4 (EY, PwC, KPMG, Deloitte)', 'Banks', 'MNCs', 'Consulting Firms']
    },
    'Civil Services Officer': {
      timeline: [
        { year: '0-2', title: 'Probationary Officer', salary: '₹7-10 LPA', skills: ['Administrative Skills', 'Policy Understanding', 'Communication', 'Leadership'] },
        { year: '2-5', title: 'Assistant Collector', salary: '₹10-15 LPA', skills: ['District Administration', 'Public Relations', 'Crisis Management', 'Policy Implementation'] },
        { year: '5-10', title: 'Deputy Collector', salary: '₹15-25 LPA', skills: ['Strategic Planning', 'Inter-departmental Coordination', 'Budget Management', 'Public Speaking'] },
        { year: '10-15', title: 'Collector/DM', salary: '₹25-35 LPA', skills: ['District Leadership', 'Political Acumen', 'Media Relations', 'Development Planning'] },
        { year: '15+', title: 'Secretary/Commissioner', salary: '₹35-50 LPA', skills: ['Policy Formulation', 'Government Relations', 'Strategic Vision', 'National Leadership'] }
      ],
      certifications: ['Management Courses', 'Foreign Service Training', 'Specialized Government Programs'],
      companies: ['Central Government', 'State Governments', 'PSUs', 'International Organizations']
    }
  };

  const generateRoadmap = (career) => {
    setSelectedCareer(career);
    setRoadmapData(careerRoadmaps[career] || null);
    setAiRoadmap(null);
  };

  useEffect(() => {
    const generateAICareers = async () => {
      if (!selectedDegree) return;
      setLoadingCareers(true);
      try {
        const response = await fetch('http://localhost:5000/api/career-suggestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ degree: selectedDegree })
        });
        const data = await response.json();
        setAiCareers(data.careers || []);
      } catch (error) {
        setAiCareers([]);
      }
      setLoadingCareers(false);
    };
    
    generateAICareers();
  }, [selectedDegree]);

  const parseRoadmapContent = (text) => {
    // Clean up all markdown symbols
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#+/g, '')
      .replace(/•/g, '')
      .trim();
    
    const sections = cleanText.split('\n\n').filter(section => section.trim());
    const roadmapSections = [];
    
    let currentSection = null;
    
    sections.forEach(section => {
      const lines = section.split('\n').filter(line => line.trim());
      
      lines.forEach(line => {
        line = line.trim();
        
        // Check if it's a header (ends with : and is short)
        if (line.endsWith(':') && line.length < 50 && !line.includes('₹')) {
          if (currentSection) {
            roadmapSections.push(currentSection);
          }
          currentSection = {
            title: line.replace(':', ''),
            items: []
          };
        } else if (line && currentSection) {
          currentSection.items.push(line);
        } else if (line && !currentSection) {
          roadmapSections.push({
            title: 'Overview',
            items: [line]
          });
        }
      });
    });
    
    if (currentSection) {
      roadmapSections.push(currentSection);
    }
    
    return roadmapSections;
  };

  const generateAIRoadmap = async (careerName = null, retryCount = 0) => {
    const career = careerName || customCareer;
    if (!career.trim()) return;
    
    if (careerName) setCustomCareer(careerName);
    setIsGenerating(true);
    setSelectedCareer('');
    setRoadmapData(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 second timeout
      
      const response = await fetch('http://localhost:5000/api/career-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          career: career,
          degree: selectedDegree
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 408 && retryCount < 1) {
          // Retry once with a simpler prompt
          return generateAIRoadmap(career, retryCount + 1);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.roadmap) {
        const parsedSections = parseRoadmapContent(data.roadmap);
        setAiRoadmap(parsedSections);
      } else {
        setAiRoadmap([{ title: 'Error', items: [data.error || 'Unable to generate roadmap. Please try a simpler career goal.'] }]);
      }
    } catch (error) {
      console.error('Error generating roadmap:', error);
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        setAiRoadmap([{ 
          title: 'Timeout Error', 
          items: [
            'The AI is taking too long to respond. Please try again with a simpler career goal.',
            'Examples: "Software Developer", "Teacher", "Doctor", "Marketing Manager"'
          ] 
        }]);
      } else {
        // Provide a basic fallback roadmap structure
        const fallbackRoadmap = [
          {
            title: 'Basic Career Path for ' + career,
            items: [
              'Entry Level (0-2 years): Start with foundational skills and gain experience',
              'Mid Level (2-5 years): Develop specialized expertise and take on more responsibilities', 
              'Senior Level (5+ years): Lead projects and mentor others in your field'
            ]
          },
          {
            title: 'General Next Steps',
            items: [
              'Research specific requirements for ' + career,
              'Build relevant skills through courses and practice',
              'Network with professionals in the field',
              'Apply for entry-level positions or internships'
            ]
          },
          {
            title: 'Note',
            items: [
              'AI service temporarily unavailable. This is a basic roadmap.',
              'For detailed guidance, please try again later or consult career resources.'
            ]
          }
        ];
        setAiRoadmap(fallbackRoadmap);
      }
    }
    
    setIsGenerating(false);
  };



  return (
    <div className="improved-roadmap">
      <div className="roadmap-header">
        <h2>
          <i className="fas fa-route"></i>
          Career Roadmap Generator
        </h2>
        <p>Select a career to see detailed progression path with salaries and skills</p>
      </div>

      <div className="career-selection">
        <h3>Choose Your Target Career</h3>
        
        <div className="default-careers">
          <h4>Popular Career Options</h4>
          <div className="default-career-buttons">
            {['Software Engineer', 'Data Scientist', 'Digital Marketing Manager', 'Financial Analyst', 'Product Manager', 'UX Designer'].map((career) => (
              <button
                key={career}
                className={`default-career-btn ${customCareer === career ? 'selected' : ''}`}
                onClick={() => generateAIRoadmap(career)}
              >
                {career}
              </button>
            ))}
          </div>
        </div>
        
        <div className="career-cards">
          {loadingCareers ? (
            <div className="loading-careers">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Loading career suggestions...</span>
            </div>
          ) : (
            aiCareers.map((career, index) => (
              <div 
                key={index}
                className={`career-card-small ${selectedCareer === career.name ? 'selected' : ''}`}
                onClick={() => generateRoadmap(career.name)}
              >
                <h5>{career.name}</h5>
                <div className="career-stats-small">
                  <span>Growth: {career.growth}</span>
                  <span>Demand: {career.demand}</span>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="custom-career-section">
          <h4>Or Enter Your Own Career Goal</h4>
          <div className="custom-input-group">
            <input
              type="text"
              placeholder="e.g., UX Designer, Investment Banker, Entrepreneur, Doctor..."
              value={customCareer}
              onChange={(e) => setCustomCareer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateAIRoadmap()}
            />
            <button 
              className="generate-ai-btn"
              onClick={generateAIRoadmap}
              disabled={!customCareer.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Generating... (~8s)
                </>
              ) : (
                <>
                  <i className="fas fa-magic"></i>
                  Generate AI Roadmap
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {roadmapData && (
        <div className="roadmap-visualization">
          <div className="roadmap-title">
            <h3>
              <i className="fas fa-map-marked-alt"></i>
              {selectedCareer} Career Roadmap
            </h3>
          </div>

          <div className="timeline">
            {roadmapData.timeline.map((stage, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <span className="year">{stage.year}</span>
                </div>
                <div className="timeline-content">
                  <div className="stage-header">
                    <h4>{stage.title}</h4>
                    <span className="salary">{stage.salary}</span>
                  </div>
                  <div className="skills-required">
                    <h5>Key Skills:</h5>
                    <div className="skills-list">
                      {stage.skills.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="additional-info">
            <div className="certifications-section">
              <h4>
                <i className="fas fa-certificate"></i>
                Recommended Certifications
              </h4>
              <div className="cert-list">
                {roadmapData.certifications.map(cert => (
                  <span key={cert} className="cert-tag">{cert}</span>
                ))}
              </div>
            </div>

            <div className="companies-section">
              <h4>
                <i className="fas fa-building"></i>
                Top Hiring Companies
              </h4>
              <div className="company-list">
                {roadmapData.companies.map(company => (
                  <span key={company} className="company-tag">{company}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {aiRoadmap && (
        <div className="ai-roadmap-section">
          <div className="ai-roadmap-header">
            <h3>
              <i className="fas fa-robot"></i>
              AI-Generated Roadmap: {customCareer}
            </h3>
          </div>
          <div className="ai-roadmap-content">
            {aiRoadmap.map((section, index) => (
              <div key={index} className="roadmap-section">
                <div className="section-header">
                  <h4>{section.title}</h4>
                </div>
                <div className="section-content">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="roadmap-item">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!roadmapData && !aiRoadmap && (
        <div className="no-selection">
          <div className="no-selection-icon">
            <i className="fas fa-map"></i>
          </div>
          <h3>Select a Career or Enter Custom Goal</h3>
          <p>Choose from predefined careers or enter your own career goal to generate a personalized roadmap using AI.</p>
        </div>
      )}
    </div>
  );
};

export default ImprovedCareerRoadmap;