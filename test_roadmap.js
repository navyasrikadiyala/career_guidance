// Simple test script to verify roadmap generation
const fetch = require('node-fetch');

async function testRoadmapGeneration() {
  console.log('Testing roadmap generation...');
  
  try {
    const response = await fetch('http://localhost:5000/api/career-roadmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        career: 'Software Developer',
        degree: 'B.Tech'
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Roadmap generated successfully!');
      console.log('Response length:', data.roadmap?.length || 0);
    } else {
      console.log('❌ Error:', data.error);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

async function testCareerSuggestions() {
  console.log('Testing career suggestions...');
  
  try {
    const response = await fetch('http://localhost:5000/api/career-suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        degree: 'B.Tech'
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Career suggestions loaded successfully!');
      console.log('Number of careers:', data.careers?.length || 0);
    } else {
      console.log('❌ Error:', data.error);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

// Run tests
testCareerSuggestions();
setTimeout(() => testRoadmapGeneration(), 1000);