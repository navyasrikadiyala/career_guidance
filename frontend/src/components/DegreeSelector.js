import React, { useState } from 'react';
import './DegreeSelector.css';

const DegreeSelector = ({ onDegreeSelect }) => {
  const [showDegreeModal, setShowDegreeModal] = useState(false);
  const [selectedDegreeData, setSelectedDegreeData] = useState(null);

  const degreeData = {
    'B.Tech': {
      icon: 'fas fa-cogs',
      description: 'Engineering & Technology',
      duration: '4 Years',
      overview: 'Bachelor of Technology is a professional undergraduate degree in engineering and technology fields.',
      keySkills: ['Problem Solving', 'Technical Analysis', 'Innovation', 'Project Management'],
      avgSalary: '₹4-12 LPA',
      topRecruiters: ['TCS', 'Infosys', 'Google', 'Microsoft', 'Amazon'],
      specializations: ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics', 'Chemical']
    },
    'B.Sc': {
      icon: 'fas fa-flask',
      description: 'Science & Research',
      duration: '3 Years',
      overview: 'Bachelor of Science focuses on scientific principles, research methodology, and analytical thinking.',
      keySkills: ['Research', 'Data Analysis', 'Critical Thinking', 'Laboratory Skills'],
      avgSalary: '₹3-8 LPA',
      topRecruiters: ['ISRO', 'DRDO', 'Pharmaceutical Companies', 'Research Labs'],
      specializations: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Data Science']
    },
    'B.Com': {
      icon: 'fas fa-briefcase',
      description: 'Commerce & Business',
      duration: '3 Years',
      overview: 'Bachelor of Commerce provides knowledge in accounting, finance, economics, and business management.',
      keySkills: ['Financial Analysis', 'Accounting', 'Business Communication', 'Market Research'],
      avgSalary: '₹3-10 LPA',
      topRecruiters: ['Banks', 'Consulting Firms', 'MNCs', 'Financial Services'],
      specializations: ['Accounting', 'Finance', 'Marketing', 'Banking', 'Economics', 'International Business']
    },
    'B.A': {
      icon: 'fas fa-book',
      description: 'Arts & Humanities',
      duration: '3 Years',
      overview: 'Bachelor of Arts develops critical thinking, communication skills, and cultural understanding.',
      keySkills: ['Communication', 'Critical Analysis', 'Research', 'Cultural Awareness'],
      avgSalary: '₹2.5-8 LPA',
      topRecruiters: ['Media Houses', 'NGOs', 'Government', 'Educational Institutions'],
      specializations: ['English', 'Psychology', 'History', 'Political Science', 'Sociology', 'Philosophy']
    },
    'BBA': {
      icon: 'fas fa-chart-line',
      description: 'Business Administration',
      duration: '3 Years',
      overview: 'Bachelor of Business Administration focuses on management principles and business operations.',
      keySkills: ['Leadership', 'Strategic Planning', 'Team Management', 'Business Analytics'],
      avgSalary: '₹3.5-12 LPA',
      topRecruiters: ['Consulting Firms', 'Startups', 'MNCs', 'Financial Services'],
      specializations: ['General Management', 'Marketing', 'Finance', 'HR', 'Operations', 'International Business']
    },
    'BCA': {
      icon: 'fas fa-laptop-code',
      description: 'Computer Applications',
      duration: '3 Years',
      overview: 'Bachelor of Computer Applications combines computer science fundamentals with practical applications.',
      keySkills: ['Programming', 'Software Development', 'Database Management', 'System Analysis'],
      avgSalary: '₹3-10 LPA',
      topRecruiters: ['IT Companies', 'Software Firms', 'Startups', 'Tech Giants'],
      specializations: ['Software Development', 'Web Development', 'Data Analytics', 'Mobile Apps', 'AI/ML', 'Cybersecurity']
    }
  };

  const handleDegreeClick = (degree) => {
    setSelectedDegreeData({ degree, ...degreeData[degree] });
    setShowDegreeModal(true);
  };

  const handleSpecializationSelect = (degree, specialization) => {
    onDegreeSelect(degree, specialization);
  };

  return (
    <div className="degree-selector-page">
      <div className="degree-hero">
        <h1>Choose Your Degree</h1>
        <p>Explore detailed information about different degree programs and find the perfect fit for your career goals</p>
      </div>

      <div className="degrees-container">
        {Object.entries(degreeData).map(([degree, data]) => (
          <div key={degree} className="degree-item">
            <div 
              className="degree-card"
              onClick={() => handleDegreeClick(degree)}
            >
              <div className="degree-header">
                <div className="degree-icon">
                  <i className={data.icon}></i>
                </div>
                <div className="degree-title">
                  <h3>{degree}</h3>
                  <p>{data.description}</p>
                </div>
                <div className="click-indicator">
                  <i className="fas fa-info-circle"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDegreeModal && selectedDegreeData && (
        <div className="modal-overlay" onClick={() => setShowDegreeModal(false)}>
          <div className="degree-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className={selectedDegreeData.icon}></i>
                {selectedDegreeData.degree} - {selectedDegreeData.description}
              </h3>
              <button className="close-btn" onClick={() => setShowDegreeModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-content">
              <div className="degree-info">
                <div className="info-grid">
                  <div className="info-card">
                    <i className="fas fa-clock"></i>
                    <div>
                      <h6>Duration</h6>
                      <p>{selectedDegreeData.duration}</p>
                    </div>
                  </div>
                  <div className="info-card">
                    <i className="fas fa-rupee-sign"></i>
                    <div>
                      <h6>Avg Salary</h6>
                      <p>{selectedDegreeData.avgSalary}</p>
                    </div>
                  </div>
                </div>
                
                <div className="overview-section">
                  <h6>Overview</h6>
                  <p>{selectedDegreeData.overview}</p>
                </div>
                
                <div className="skills-section">
                  <h6>Key Skills</h6>
                  <div className="skills-tags">
                    {selectedDegreeData.keySkills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="recruiters-section">
                  <h6>Top Recruiters</h6>
                  <div className="recruiters-list">
                    {selectedDegreeData.topRecruiters.map(recruiter => (
                      <span key={recruiter} className="recruiter-tag">{recruiter}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="specializations">
                <h5>Choose Your Specialization:</h5>
                <div className="specialization-grid">
                  {selectedDegreeData.specializations.map(spec => (
                    <button
                      key={spec}
                      className="specialization-btn"
                      onClick={() => {
                        handleSpecializationSelect(selectedDegreeData.degree, spec);
                        setShowDegreeModal(false);
                      }}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DegreeSelector;