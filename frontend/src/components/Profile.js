import React, { useState } from 'react';
import SkillsAssessment from './SkillsAssessment';
import './Profile.css';

const Profile = ({ user }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [userProfile, setUserProfile] = useState({
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    interests: ['Web Development', 'Data Science', 'AI/ML', 'Mobile Apps'],
    goals: [
      { text: 'Become Full Stack Developer', progress: 60 },
      { text: 'Get promoted to Tech Lead', progress: 30 },
      { text: 'Master React & Node.js', progress: 80 },
      { text: 'Start own tech company', progress: 10 }
    ],
    bio: 'Passionate about technology and creating innovative solutions.',
    education: 'B.Tech Computer Science',
    experience: '2 years'
  });
  const [editData, setEditData] = useState({ ...userProfile });

  const profileSections = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-user' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
    { id: 'interests', label: 'Interests', icon: 'fas fa-heart' },
    { id: 'goals', label: 'Goals', icon: 'fas fa-target' },
    { id: 'assessment', label: 'Assessment', icon: 'fas fa-bullseye' }
  ];

  const addItem = (section) => {
    if (newItem.trim()) {
      if (section === 'goals') {
        setUserProfile(prev => ({
          ...prev,
          goals: [...prev.goals, { text: newItem.trim(), progress: 0 }]
        }));
      } else {
        setUserProfile(prev => ({
          ...prev,
          [section]: [...prev[section], newItem.trim()]
        }));
      }
      setNewItem('');
    }
  };

  const updateGoalProgress = (index, progress) => {
    setUserProfile(prev => ({
      ...prev,
      goals: prev.goals.map((goal, i) => 
        i === index ? { ...goal, progress: parseInt(progress) } : goal
      )
    }));
  };

  const removeItem = (section, index) => {
    setUserProfile(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const saveProfile = () => {
    setUserProfile(editData);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditData({ ...userProfile });
    setIsEditing(false);
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="profile-overview">
            <div className="section-header">
              <h3>Profile Overview</h3>
              <button 
                className={`edit-btn ${isEditing ? 'active' : ''}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                <i className={`fas ${isEditing ? 'fa-times' : 'fa-edit'}`}></i>
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Education</label>
                  <input 
                    type="text" 
                    value={editData.education}
                    onChange={(e) => setEditData({...editData, education: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Experience</label>
                  <input 
                    type="text" 
                    value={editData.experience}
                    onChange={(e) => setEditData({...editData, experience: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>About Me</label>
                  <textarea 
                    value={editData.bio}
                    onChange={(e) => setEditData({...editData, bio: e.target.value})}
                    rows={3}
                  />
                </div>
                <div className="form-actions">
                  <button className="save-btn" onClick={saveProfile}>
                    <i className="fas fa-check"></i> Save
                  </button>
                  <button className="cancel-btn" onClick={cancelEdit}>
                    <i className="fas fa-times"></i> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="profile-stats">
                  <div className="stat-card">
                    <i className="fas fa-graduation-cap"></i>
                    <div>
                      <h4>Education</h4>
                      <p>{userProfile.education}</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <i className="fas fa-briefcase"></i>
                    <div>
                      <h4>Experience</h4>
                      <p>{userProfile.experience}</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <i className="fas fa-chart-line"></i>
                    <div>
                      <h4>Progress</h4>
                      <p>75% Complete</p>
                    </div>
                  </div>
                </div>
                <div className="bio-section">
                  <h4>About Me</h4>
                  <p>{userProfile.bio}</p>
                </div>
              </>
            )}
          </div>
        );
      case 'skills':
        return (
          <div className="skills-section">
            <div className="section-header">
              <h3>My Skills</h3>
            </div>
            <div className="skills-grid">
              {userProfile.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  <i className="fas fa-check-circle"></i>
                  <span>{skill}</span>
                  <button 
                    className="remove-tag-btn"
                    onClick={() => removeItem('skills', index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="add-item-form">
              <input 
                type="text" 
                placeholder="Add a new skill..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem('skills')}
              />
              <button 
                className="add-btn"
                onClick={() => addItem('skills')}
                disabled={!newItem.trim()}
              >
                <i className="fas fa-plus"></i>
                Add
              </button>
            </div>
          </div>
        );
      case 'interests':
        return (
          <div className="interests-section">
            <div className="section-header">
              <h3>My Interests</h3>
            </div>
            <div className="interests-grid">
              {userProfile.interests.map((interest, index) => (
                <div key={index} className="interest-card">
                  <i className="fas fa-star"></i>
                  <span>{interest}</span>
                  <button 
                    className="remove-tag-btn"
                    onClick={() => removeItem('interests', index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="add-item-form">
              <input 
                type="text" 
                placeholder="Add a new interest..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem('interests')}
              />
              <button 
                className="add-btn"
                onClick={() => addItem('interests')}
                disabled={!newItem.trim()}
              >
                <i className="fas fa-plus"></i>
                Add
              </button>
            </div>
          </div>
        );
      case 'goals':
        return (
          <div className="goals-section">
            <div className="section-header">
              <h3>
                <i className="fas fa-target"></i>
                Career Goals
              </h3>
              <p>Set and track your career milestones</p>
            </div>
            <div className="goals-list">
              {userProfile.goals.map((goal, index) => {
                const status = goal.progress >= 80 ? 'completed' : goal.progress >= 30 ? 'in-progress' : 'pending';
                return (
                  <div key={index} className={`goal-item ${status}`}>
                    <div className="goal-main">
                      <div className="goal-icon">
                        <i className={`fas ${
                          status === 'completed' ? 'fa-check-circle' : 
                          status === 'in-progress' ? 'fa-clock' : 'fa-target'
                        }`}></i>
                      </div>
                      <div className="goal-text">
                        <h4>{goal.text}</h4>
                        <span className={`status-badge ${status}`}>
                          {status === 'completed' ? 'Completed' : 
                           status === 'in-progress' ? 'In Progress' : 'Not Started'}
                        </span>
                      </div>
                      <button 
                        className="remove-goal-btn"
                        onClick={() => removeItem('goals', index)}
                        title="Remove goal"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="goal-progress">
                      <div className="progress-controls">
                        <label>Progress: {goal.progress}%</label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={goal.progress}
                          onChange={(e) => updateGoalProgress(index, e.target.value)}
                          className="progress-slider"
                        />
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${goal.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="add-goal-form">
              <h4>
                <i className="fas fa-plus-circle"></i>
                Add New Goal
              </h4>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Enter your career goal..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem('goals')}
                  className="goal-input"
                />
                <button 
                  className="add-goal-btn"
                  onClick={() => addItem('goals')}
                  disabled={!newItem.trim()}
                >
                  <i className="fas fa-plus"></i>
                  Add
                </button>
              </div>
            </div>
          </div>
        );
      case 'assessment':
        return <SkillsAssessment selectedDegree="B.Tech" />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <i className="fas fa-user"></i>
        </div>
        <div className="profile-info">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <div className="profile-badges">
            <span className="badge">Active Learner</span>
            <span className="badge">Goal Setter</span>
          </div>
        </div>
      </div>

      <div className="profile-navigation">
        {profileSections.map(section => (
          <button
            key={section.id}
            className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <i className={section.icon}></i>
            {section.label}
          </button>
        ))}
      </div>

      <div className="profile-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;