import React from 'react';
import App from './App';

// Simple test component to verify React is working
function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Career Guidance Platform</h1>
      <p>If you see this, React is working correctly!</p>
      <button onClick={() => alert('Button works!')}>Test Button</button>
    </div>
  );
}

export default TestApp;