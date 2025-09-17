import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import Chatbot from './components/Chatbot';
import SkillsAssessment from './components/SkillsAssessment';
import CareerRoadmap from './components/CareerRoadmap';
import ImprovedCareerRoadmap from './components/ImprovedCareerRoadmap';
import FeaturesSection from './components/FeaturesSection';
import DegreeSelector from './components/DegreeSelector';
import Profile from './components/Profile';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [careerPaths, setCareerPaths] = useState({});
  const [comparison, setComparison] = useState([]);
  const [interests, setInterests] = useState('');
  const [aiGuidance, setAiGuidance] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [expandedDegree, setExpandedDegree] = useState('');

  const [showCareerModal, setShowCareerModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [generatedRoadmap, setGeneratedRoadmap] = useState('');
  const [roadmapLoading, setRoadmapLoading] = useState(false);

  const handleDegreeSelection = (degree, specialization) => {
    setSelectedDegree(degree);
    setSelectedSpecialization(specialization);
    
    const fallbackData = {
      'B.Tech': {
        careers: ['Software Engineer (₹6-25 LPA)', 'Data Scientist (₹8-30 LPA)', 'Product Manager (₹12-40 LPA)', 'DevOps Engineer (₹7-22 LPA)', 'AI/ML Engineer (₹10-35 LPA)'],
        higherStudies: ['M.Tech (IITs/NITs)', 'MS Abroad (USA/Germany)', 'MBA (Top B-Schools)', 'PhD (Research)', 'Industry Certifications'],
        exams: ['GATE (PSU Jobs)', 'GRE/TOEFL (Abroad)', 'CAT/XAT (MBA)', 'Company Coding Tests', 'AWS/Google Cloud Certs']
      },
      'B.Sc': {
        careers: ['Research Scientist (₹5-18 LPA)', 'Data Analyst (₹4-15 LPA)', 'Lab Technician (₹3-8 LPA)', 'Quality Analyst (₹4-12 LPA)', 'Biotech Specialist (₹5-16 LPA)'],
        higherStudies: ['M.Sc (Specialization)', 'B.Tech (Lateral Entry)', 'MBA (Management)', 'B.Ed (Teaching)', 'Integrated PhD'],
        exams: ['GATE (Engineering)', 'NET/JRF (Research)', 'CSIR-NET (Science)', 'Banking Exams', 'State PSC']
      },
      'B.Com': {
        careers: ['Chartered Accountant (₹6-25 LPA)', 'Financial Analyst (₹5-18 LPA)', 'Banking Officer (₹4-15 LPA)', 'Tax Consultant (₹4-12 LPA)', 'Investment Advisor (₹6-20 LPA)'],
        higherStudies: ['M.Com (Advanced)', 'MBA Finance/Marketing', 'CA (Chartered Accountancy)', 'CS (Company Secretary)', 'CMA (Cost Management)'],
        exams: ['Bank PO/Clerk', 'SSC CGL/CHSL', 'CA Foundation/Inter/Final', 'CS Executive/Professional', 'CMA Foundation/Inter/Final']
      },
      'B.A': {
        careers: ['Civil Services Officer (₹7-20 LPA)', 'Content Writer (₹3-10 LPA)', 'Journalist (₹4-15 LPA)', 'HR Executive (₹4-12 LPA)', 'Digital Marketer (₹4-14 LPA)'],
        higherStudies: ['M.A (Subject Specialization)', 'MBA (Management)', 'B.Ed (Teaching)', 'LLB (Law)', 'Mass Communication'],
        exams: ['UPSC Civil Services', 'State PSC Exams', 'UGC NET/JRF', 'Bank PO/Clerk', 'SSC CGL/CHSL']
      },
      'BBA': {
        careers: ['Business Analyst (₹5-18 LPA)', 'Marketing Manager (₹6-20 LPA)', 'HR Manager (₹5-16 LPA)', 'Operations Manager (₹6-18 LPA)', 'Sales Executive (₹4-15 LPA)'],
        higherStudies: ['MBA (Top B-Schools)', 'PGDM (Management)', 'MS Abroad', 'Specialized Certifications', 'Executive Programs'],
        exams: ['CAT/XAT/MAT (MBA)', 'GMAT (International)', 'Company Interviews', 'Digital Marketing Certs', 'HR Certifications']
      },
      'BCA': {
        careers: ['Software Developer (₹4-18 LPA)', 'Web Developer (₹4-15 LPA)', 'Mobile App Developer (₹5-20 LPA)', 'System Analyst (₹5-16 LPA)', 'Database Admin (₹5-18 LPA)'],
        higherStudies: ['MCA (Master in CA)', 'M.Tech (Technology)', 'MBA (IT Management)', 'MS Computer Science', 'Cloud Computing'],
        exams: ['NIMCET (MCA Entrance)', 'GATE (M.Tech)', 'Company Coding Tests', 'AWS/Azure Certifications', 'Google Cloud Certs']
      }
    };
    
    setCareerPaths(fallbackData[degree] || {});
    setShowCareerModal(true);
  };

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const savedTab = localStorage.getItem('activeTab');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Fallback data in case backend is not running
      const fallbackDegrees = ['B.A.', 'B.Sc.', 'B.Com.'];
      setDegrees(fallbackDegrees);
      
      // Try to fetch from backend
      setLoading(true);
      fetch('http://localhost:5000/api/degrees')
        .then(res => res.json())
        .then(data => {
          setDegrees(data);
          setLoading(false);
        })
        .catch(() => {
          console.log('Backend not available, using fallback data');
          setLoading(false);
        });
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('activeTab');
    setUser(null);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const handleDegreeClick = (degree) => {
    if (expandedDegree === degree) {
      setExpandedDegree('');
    } else {
      setExpandedDegree(degree);
      setSelectedDegree('');
      setSelectedSpecialization('');
    }
  };

  const handleSpecializationSelect = async (degree, specialization) => {
    setSelectedDegree(degree);
    setSelectedSpecialization(specialization);
    setLoading(true);
    
    const fallbackData = {
      'B.Tech': {
        careers: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Technical Lead'],
        higherStudies: ['M.Tech', 'MBA', 'MS', 'PhD'],
        exams: ['GATE', 'GRE', 'CAT', 'Company Interviews']
      },
      'B.Sc': {
        careers: ['Research Scientist', 'Lab Technician', 'Data Analyst', 'Quality Control'],
        higherStudies: ['M.Sc', 'B.Tech', 'MBA', 'B.Ed'],
        exams: ['GATE', 'NET', 'CSIR', 'Banking']
      },
      'B.Com': {
        careers: ['Accountant', 'Financial Analyst', 'Tax Consultant', 'Banking Officer'],
        higherStudies: ['M.Com', 'MBA', 'CA', 'CS'],
        exams: ['Bank PO', 'SSC CGL', 'CA', 'CS']
      },
      'B.A': {
        careers: ['Civil Services', 'Teaching', 'Journalism', 'Content Writing'],
        higherStudies: ['M.A', 'MBA', 'B.Ed', 'Law'],
        exams: ['UPSC', 'State PSC', 'UGC NET', 'Bank PO']
      },
      'BBA': {
        careers: ['Business Analyst', 'Marketing Manager', 'HR Executive', 'Operations Manager'],
        higherStudies: ['MBA', 'PGDM', 'MS', 'Specialized Certifications'],
        exams: ['CAT', 'XAT', 'GMAT', 'Company Interviews']
      },
      'BCA': {
        careers: ['Software Developer', 'Web Developer', 'System Analyst', 'IT Consultant'],
        higherStudies: ['MCA', 'M.Tech', 'MBA', 'MS'],
        exams: ['NIMCET', 'GATE', 'Company Interviews', 'Certification Exams']
      }
    };
    
    try {
      const res = await fetch(`http://localhost:5000/api/career-paths/${degree}`);
      const data = await res.json();
      setCareerPaths(data);
    } catch (error) {
      setCareerPaths(fallbackData[degree] || {});
    }
    setLoading(false);
  };

  const addToComparison = () => {
    if (selectedDegree && !comparison.find(d => d.degree === selectedDegree)) {
      setComparison([...comparison, { degree: selectedDegree, ...careerPaths }]);
      handleTabChange('compare');
    }
  };

  const removeFromComparison = (degree) => {
    setComparison(comparison.filter(item => item.degree !== degree));
  };

  const toggleExpandedItem = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const cleanMarkdown = (text) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#+/g, '')
      .replace(/•/g, '')
      .replace(/`/g, '')
      .replace(/~/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();
  };

  const formatRoadmap = (text) => {
    const sections = text.split('\n\n').filter(section => section.trim());
    return sections.map((section, index) => {
      const lines = section.split('\n').filter(line => line.trim());
      const title = lines[0]?.replace(/\*\*/g, '').replace(/#+/g, '').trim();
      const content = lines.slice(1);
      
      return (
        <div key={index} className="roadmap-section">
          <h4 className="roadmap-title">{title}</h4>
          <div className="roadmap-items">
            {content.map((item, itemIndex) => (
              <div key={itemIndex} className="roadmap-item">
                {item.replace(/•/g, '').replace(/\*/g, '').trim()}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  const getAIGuidance = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests, degree: selectedDegree })
      });
      const data = await res.json();
      setAiGuidance(cleanMarkdown(data.guidance));
    } catch (error) {
      setAiGuidance('Sorry, AI guidance is currently unavailable. Please try again later.');
    }
    setAiLoading(false);
  };

  const generateRoadmap = async () => {
    setRoadmapLoading(true);
    try {
      const career = aiGuidance.split('\n')[1]?.replace('1. ', '').split(' - ')[0] || 'Software Developer';
      const res = await fetch('http://localhost:5000/api/career-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ career, degree: selectedDegree })
      });
      const data = await res.json();
      setGeneratedRoadmap(data.roadmap || 'Unable to generate roadmap. Please try again.');
    } catch (error) {
      setGeneratedRoadmap('Unable to generate roadmap. Please try again.');
    }
    setRoadmapLoading(false);
  };

  const shareRoadmap = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Career Roadmap',
        text: generatedRoadmap
      });
    } else {
      navigator.clipboard.writeText(generatedRoadmap);
      alert('Roadmap copied to clipboard!');
    }
  };

  const downloadRoadmap = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedRoadmap], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'career-roadmap.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  return (
    <div className="App">
      <Header activeTab={activeTab} setActiveTab={handleTabChange} user={user} onLogout={handleLogout} />

      <main className="main-content">
        {activeTab === 'home' && (
          <div className="home-section">
            <div className="hero career-hero">
              <div className="hero-background">
                <div className="floating-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                  <div className="shape shape-4"></div>
                </div>
                <div className="career-icons">
                  <div className="icon-wrapper">
                    <i className="fas fa-graduation-cap"></i>
                    <span className="icon-label">Education</span>
                  </div>
                  <div className="icon-wrapper">
                    <i className="fas fa-briefcase"></i>
                    <span className="icon-label">Career</span>
                  </div>
                  <div className="icon-wrapper">
                    <i className="fas fa-chart-line"></i>
                    <span className="icon-label">Growth</span>
                  </div>
                  <div className="icon-wrapper">
                    <i className="fas fa-lightbulb"></i>
                    <span className="icon-label">Innovation</span>
                  </div>
                  <div className="icon-wrapper">
                    <i className="fas fa-rocket"></i>
                    <span className="icon-label">Launch</span>
                  </div>
                  <div className="icon-wrapper">
                    <i className="fas fa-target"></i>
                    <span className="icon-label">Goals</span>
                  </div>
                </div>
              </div>
              <div className="hero-content">
                <div className="hero-badge"><i className="fas fa-rocket"></i> Your Future Starts Here</div>
                <h1 className="hero-title">
                  <span className="title-line-1">Welcome to</span>
                  <span className="title-line-2">Career<span className="highlight">Path</span></span>
                </h1>
                <p className="hero-subtitle">Discover your perfect career with AI-powered guidance and personalized roadmaps</p>
                <div className="hero-cta">
                  <button className="cta-secondary" onClick={() => handleTabChange('guidance')}><i className="fas fa-robot"></i> Get AI Guidance</button>
                </div>
                <div className="hero-stats">
                  <div className="stat">
                    <div className="stat-icon"><i className="fas fa-graduation-cap"></i></div>
                    <span className="stat-number">6+</span>
                    <span className="stat-label">Degree Programs</span>
                  </div>
                  <div className="stat">
                    <div className="stat-icon"><i className="fas fa-briefcase"></i></div>
                    <span className="stat-number">100+</span>
                    <span className="stat-label">Career Paths</span>
                  </div>
                  <div className="stat">
                    <div className="stat-icon"><i className="fas fa-brain"></i></div>
                    <span className="stat-number">AI</span>
                    <span className="stat-label">Powered Guidance</span>
                  </div>
                </div>
              </div>
            </div>
            
            <FeaturesSection />
          </div>
        )}

        {activeTab === 'degrees' && (
          <DegreeSelector onDegreeSelect={handleDegreeSelection} />
        )}

        {activeTab === 'explore' && (
          <div className="explore-section">
            <div className="hero">
              <h2>Choose Your Academic Path</h2>
              <p>Discover endless possibilities with every degree choice</p>
            </div>
            
            <FeaturesSection />
            
            <div className="degree-selector">
              <h3>Choose Your Degree</h3>
              <div className="degree-grid">
                {Object.entries(degreeData).map(([degree, data]) => (
                  <div key={degree} className="degree-container">
                    <div 
                      className={`degree-card ${expandedDegree === degree ? 'expanded' : ''}`}
                      onClick={() => handleDegreeClick(degree)}
                    >
                      <div className="degree-icon">
                        <i className={data.icon}></i>
                      </div>
                      <h4>{degree}</h4>
                      <p>{data.description}</p>
                      <div className="expand-indicator">
                        <i className={`fas ${expandedDegree === degree ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                      </div>
                    </div>
                    
                    {expandedDegree === degree && (
                      <div className="degree-details">
                        <div className="degree-info">
                          <div className="info-grid">
                            <div className="info-card">
                              <i className="fas fa-clock"></i>
                              <div>
                                <h6>Duration</h6>
                                <p>{data.duration}</p>
                              </div>
                            </div>
                            <div className="info-card">
                              <i className="fas fa-rupee-sign"></i>
                              <div>
                                <h6>Avg Salary</h6>
                                <p>{data.avgSalary}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="overview-section">
                            <h6>Overview</h6>
                            <p>{data.overview}</p>
                          </div>
                          
                          <div className="skills-section">
                            <h6>Key Skills</h6>
                            <div className="skills-tags">
                              {data.keySkills.map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="recruiters-section">
                            <h6>Top Recruiters</h6>
                            <div className="recruiters-list">
                              {data.topRecruiters.map(recruiter => (
                                <span key={recruiter} className="recruiter-tag">{recruiter}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="specializations">
                          <h5>Choose Your Specialization:</h5>
                          <div className="specialization-grid">
                            {data.specializations.map(spec => (
                              <button
                                key={spec}
                                className={`specialization-btn ${selectedSpecialization === spec ? 'selected' : ''}`}
                                onClick={() => handleSpecializationSelect(degree, spec)}
                              >
                                {spec}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {selectedDegree && selectedSpecialization && (
              <div className="career-showcase">
                <div className="showcase-header">
                  <h3>
                    <i className="fas fa-bullseye"></i>
                    {selectedDegree} - {selectedSpecialization} Career Opportunities
                  </h3>
                  <button className="add-compare-btn" onClick={addToComparison}>
                    <i className="fas fa-plus"></i>
                    Add to Compare
                  </button>
                </div>
                
                {loading ? (
                  <div className="loading">
                    <i className="fas fa-spinner fa-spin"></i>
                    Loading career paths...
                  </div>
                ) : (
                  <div className="career-paths">
                    <div className="path-card careers">
                      <div className="card-header">
                        <i className="fas fa-briefcase"></i>
                        <h4>Direct Careers</h4>
                      </div>
                      <div className="career-list">
                        {careerPaths.careers?.map(career => (
                          <div key={career} className="career-item">
                            <i className="fas fa-arrow-right"></i>
                            {career}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="path-card studies">
                      <div className="card-header">
                        <i className="fas fa-graduation-cap"></i>
                        <h4>Higher Studies</h4>
                      </div>
                      <div className="career-list">
                        {careerPaths.higherStudies?.map(study => (
                          <div key={study} className="career-item">
                            <i className="fas fa-arrow-right"></i>
                            {study}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="path-card exams">
                      <div className="card-header">
                        <i className="fas fa-file-alt"></i>
                        <h4>Competitive Exams</h4>
                      </div>
                      <div className="career-list">
                        {careerPaths.exams?.map(exam => (
                          <div key={exam} className="career-item">
                            <i className="fas fa-arrow-right"></i>
                            {exam}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="compare-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-balance-scale"></i>
                Degree Comparison
              </h2>
              <p>Compare degrees side by side to make the best choice</p>
            </div>
            
            <div className="degree-selector-for-comparison">
              <h3>Select Degrees to Compare</h3>
              <div className="comparison-degree-grid">
                {Object.entries(degreeData).map(([degree, data]) => {
                  const isSelected = comparison.some(item => item.degree === degree);
                  return (
                    <div 
                      key={degree} 
                      className={`comparison-degree-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        if (isSelected) {
                          removeFromComparison(degree);
                        } else {
                          const degreeCareerData = {
                            'B.Tech': {
                              careers: ['Software Engineer (₹6-25 LPA)', 'Data Scientist (₹8-30 LPA)', 'Product Manager (₹12-40 LPA)', 'DevOps Engineer (₹7-22 LPA)', 'AI/ML Engineer (₹10-35 LPA)'],
                              higherStudies: ['M.Tech (IITs/NITs)', 'MS Abroad (USA/Germany)', 'MBA (Top B-Schools)', 'PhD (Research)', 'Industry Certifications'],
                              exams: ['GATE (PSU Jobs)', 'GRE/TOEFL (Abroad)', 'CAT/XAT (MBA)', 'Company Coding Tests', 'AWS/Google Cloud Certs']
                            },
                            'B.Sc': {
                              careers: ['Research Scientist (₹5-18 LPA)', 'Data Analyst (₹4-15 LPA)', 'Lab Technician (₹3-8 LPA)', 'Quality Analyst (₹4-12 LPA)', 'Biotech Specialist (₹5-16 LPA)'],
                              higherStudies: ['M.Sc (Specialization)', 'B.Tech (Lateral Entry)', 'MBA (Management)', 'B.Ed (Teaching)', 'Integrated PhD'],
                              exams: ['GATE (Engineering)', 'NET/JRF (Research)', 'CSIR-NET (Science)', 'Banking Exams', 'State PSC']
                            },
                            'B.Com': {
                              careers: ['Chartered Accountant (₹6-25 LPA)', 'Financial Analyst (₹5-18 LPA)', 'Banking Officer (₹4-15 LPA)', 'Tax Consultant (₹4-12 LPA)', 'Investment Advisor (₹6-20 LPA)'],
                              higherStudies: ['M.Com (Advanced)', 'MBA Finance/Marketing', 'CA (Chartered Accountancy)', 'CS (Company Secretary)', 'CMA (Cost Management)'],
                              exams: ['Bank PO/Clerk', 'SSC CGL/CHSL', 'CA Foundation/Inter/Final', 'CS Executive/Professional', 'CMA Foundation/Inter/Final']
                            },
                            'B.A': {
                              careers: ['Civil Services Officer (₹7-20 LPA)', 'Content Writer (₹3-10 LPA)', 'Journalist (₹4-15 LPA)', 'HR Executive (₹4-12 LPA)', 'Digital Marketer (₹4-14 LPA)'],
                              higherStudies: ['M.A (Subject Specialization)', 'MBA (Management)', 'B.Ed (Teaching)', 'LLB (Law)', 'Mass Communication'],
                              exams: ['UPSC Civil Services', 'State PSC Exams', 'UGC NET/JRF', 'Bank PO/Clerk', 'SSC CGL/CHSL']
                            },
                            'BBA': {
                              careers: ['Business Analyst (₹5-18 LPA)', 'Marketing Manager (₹6-20 LPA)', 'HR Manager (₹5-16 LPA)', 'Operations Manager (₹6-18 LPA)', 'Sales Executive (₹4-15 LPA)'],
                              higherStudies: ['MBA (Top B-Schools)', 'PGDM (Management)', 'MS Abroad', 'Specialized Certifications', 'Executive Programs'],
                              exams: ['CAT/XAT/MAT (MBA)', 'GMAT (International)', 'Company Interviews', 'Digital Marketing Certs', 'HR Certifications']
                            },
                            'BCA': {
                              careers: ['Software Developer (₹4-18 LPA)', 'Web Developer (₹4-15 LPA)', 'Mobile App Developer (₹5-20 LPA)', 'System Analyst (₹5-16 LPA)', 'Database Admin (₹5-18 LPA)'],
                              higherStudies: ['MCA (Master in CA)', 'M.Tech (Technology)', 'MBA (IT Management)', 'MS Computer Science', 'Cloud Computing'],
                              exams: ['NIMCET (MCA Entrance)', 'GATE (M.Tech)', 'Company Coding Tests', 'AWS/Azure Certifications', 'Google Cloud Certs']
                            }
                          };
                          setComparison([...comparison, { degree, ...degreeCareerData[degree] }]);
                        }
                      }}
                    >
                      <div className="degree-icon">
                        <i className={data.icon}></i>
                      </div>
                      <h4>{degree}</h4>
                      <p>{data.description}</p>
                      {isSelected && (
                        <div className="selected-indicator">
                          <i className="fas fa-check-circle"></i>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {comparison.length > 0 && (
              <div className="comparison-container">
                <div className="comparison-controls">
                  <div className="comparison-count">
                    <i className="fas fa-layer-group"></i>
                    Comparing {comparison.length} degree{comparison.length > 1 ? 's' : ''}
                  </div>
                  <button 
                    className="clear-all-btn"
                    onClick={() => setComparison([])}
                  >
                    <i className="fas fa-trash"></i>
                    Clear All
                  </button>
                </div>
                
                <div className="comparison-table">
                  <div className="table-header">
                    <div className="criteria-column">
                      <h4>Criteria</h4>
                    </div>
                    {comparison.map(item => (
                      <div key={item.degree} className="degree-column">
                        <div className="degree-header">
                          <h4>{item.degree}</h4>
                          <button 
                            className="remove-degree-btn"
                            onClick={() => removeFromComparison(item.degree)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="table-row">
                    <div className="criteria-cell">
                      <i className="fas fa-briefcase"></i>
                      <span>Career Options</span>
                    </div>
                    {comparison.map(item => {
                      const careersKey = `${item.degree}-careers`;
                      const isExpanded = expandedItems[careersKey];
                      const itemsToShow = isExpanded ? item.careers : item.careers?.slice(0, 3);
                      
                      return (
                        <div key={careersKey} className="data-cell">
                          <div className="count-badge">{item.careers?.length || 0} options</div>
                          <div className="items-list">
                            {itemsToShow?.map(career => (
                              <div key={career} className="item">{career}</div>
                            ))}
                            {item.careers?.length > 3 && (
                              <button 
                                className="more-items-btn"
                                onClick={() => toggleExpandedItem(careersKey)}
                              >
                                {isExpanded ? 
                                  `Show less` : 
                                  `+${item.careers.length - 3} more`
                                }
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="table-row">
                    <div className="criteria-cell">
                      <i className="fas fa-graduation-cap"></i>
                      <span>Higher Studies</span>
                    </div>
                    {comparison.map(item => {
                      const studiesKey = `${item.degree}-studies`;
                      const isExpanded = expandedItems[studiesKey];
                      const itemsToShow = isExpanded ? item.higherStudies : item.higherStudies?.slice(0, 3);
                      
                      return (
                        <div key={studiesKey} className="data-cell">
                          <div className="count-badge">{item.higherStudies?.length || 0} options</div>
                          <div className="items-list">
                            {itemsToShow?.map(study => (
                              <div key={study} className="item">{study}</div>
                            ))}
                            {item.higherStudies?.length > 3 && (
                              <button 
                                className="more-items-btn"
                                onClick={() => toggleExpandedItem(studiesKey)}
                              >
                                {isExpanded ? 
                                  `Show less` : 
                                  `+${item.higherStudies.length - 3} more`
                                }
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="table-row">
                    <div className="criteria-cell">
                      <i className="fas fa-file-alt"></i>
                      <span>Competitive Exams</span>
                    </div>
                    {comparison.map(item => {
                      const examsKey = `${item.degree}-exams`;
                      const isExpanded = expandedItems[examsKey];
                      const itemsToShow = isExpanded ? item.exams : item.exams?.slice(0, 3);
                      
                      return (
                        <div key={examsKey} className="data-cell">
                          <div className="count-badge">{item.exams?.length || 0} exams</div>
                          <div className="items-list">
                            {itemsToShow?.map(exam => (
                              <div key={exam} className="item">{exam}</div>
                            ))}
                            {item.exams?.length > 3 && (
                              <button 
                                className="more-items-btn"
                                onClick={() => toggleExpandedItem(examsKey)}
                              >
                                {isExpanded ? 
                                  `Show less` : 
                                  `+${item.exams.length - 3} more`
                                }
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="table-row recommendation-row">
                    <div className="criteria-cell">
                      <i className="fas fa-star"></i>
                      <span>Recommendation</span>
                    </div>
                    {comparison.map(item => {
                      const totalOptions = (item.careers?.length || 0) + (item.higherStudies?.length || 0) + (item.exams?.length || 0);
                      const rating = totalOptions > 15 ? 'Excellent' : totalOptions > 10 ? 'Good' : 'Average';
                      const ratingClass = rating === 'Excellent' ? 'excellent' : rating === 'Good' ? 'good' : 'average';
                      
                      return (
                        <div key={`${item.degree}-rating`} className="data-cell">
                          <div className={`rating-badge ${ratingClass}`}>
                            {rating}
                          </div>
                          <div className="total-options">
                            {totalOptions} total opportunities
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'roadmap' && (
          <ImprovedCareerRoadmap selectedDegree={selectedDegree} careerPaths={careerPaths} />
        )}

        {activeTab === 'guidance' && (
          <div className="guidance-section">
            <div className="simple-guidance">
              <h2>🎯 AI Career Guide</h2>
              <p>Get personalized career advice in 30 seconds</p>
              
              <div className="quick-form">
                <div className="input-row">
                  <select 
                    value={selectedDegree} 
                    onChange={(e) => setSelectedDegree(e.target.value)}
                    className="degree-select"
                  >
                    <option value="">Select your degree</option>
                    {Object.keys(degreeData).map(degree => (
                      <option key={degree} value={degree}>{degree}</option>
                    ))}
                  </select>
                </div>
                
                <div className="input-row">
                  <textarea 
                    placeholder="What interests you? (e.g., technology, helping people, creative work, business...)"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    rows={3}
                    className="interests-input"
                  />
                </div>
                
                <button 
                  className="get-advice-btn"
                  onClick={getAIGuidance} 
                  disabled={!selectedDegree || !interests || aiLoading}
                >
                  {aiLoading ? (
                    <>⏳ Getting advice...</>
                  ) : (
                    <>🚀 Get Career Advice</>
                  )}
                </button>
              </div>
              
              {aiGuidance && (
                <div className="advice-result">
                  <h3>💡 Your Career Advice</h3>
                  <div className="advice-content">{aiGuidance}</div>
                  <button 
                    className="next-btn"
                    onClick={generateRoadmap}
                    disabled={roadmapLoading}
                  >
                    {roadmapLoading ? (
                      <>⏳ Generating...</>
                    ) : (
                      <>📍 Generate Roadmap</>
                    )}
                  </button>
                </div>
              )}
              
              {generatedRoadmap && (
                <div className="roadmap-result">
                  <h3>🗺️ Your Career Roadmap</h3>
                  <div className="roadmap-content">{formatRoadmap(generatedRoadmap)}</div>
                  <div className="roadmap-actions">
                    <button className="share-btn" onClick={shareRoadmap}>
                      📤 Share
                    </button>
                    <button className="download-btn" onClick={downloadRoadmap}>
                      💾 Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <SkillsAssessment selectedDegree={selectedDegree} />
        )}

        {activeTab === 'profile' && (
          <Profile user={user} />
        )}
      </main>

      {showCareerModal && (
        <div className="modal-overlay" onClick={() => setShowCareerModal(false)}>
          <div className="career-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-graduation-cap"></i>
                {selectedDegree} - {selectedSpecialization}
              </h3>
              <button className="close-btn" onClick={() => setShowCareerModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-content">
              <div className="career-paths">
                <div className="path-card careers">
                  <div className="card-header">
                    <i className="fas fa-briefcase"></i>
                    <h4>Career Opportunities</h4>
                  </div>
                  <div className="career-list">
                    {careerPaths.careers?.map(career => (
                      <div key={career} className="career-item">
                        {career}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="path-card studies">
                  <div className="card-header">
                    <i className="fas fa-graduation-cap"></i>
                    <h4>Higher Studies</h4>
                  </div>
                  <div className="career-list">
                    {careerPaths.higherStudies?.map(study => (
                      <div key={study} className="career-item">
                        {study}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="path-card exams">
                  <div className="card-header">
                    <i className="fas fa-file-alt"></i>
                    <h4>Competitive Exams</h4>
                  </div>
                  <div className="career-list">
                    {careerPaths.exams?.map(exam => (
                      <div key={exam} className="career-item">
                        {exam}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2024 CareerPath Platform | Empowering Students to Make Informed Career Choices</p>
      </footer>
      
      <Chatbot />
    </div>
  );
}

export default App;