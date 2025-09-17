const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI('AIzaSyBNL6vROaTtLOaVhz51lIZZZSvQ1wmjk_I');

// Connect to MongoDB
connectDB();

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose is connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose connection disconnected');
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }
  
  jwt.verify(token, 'career-path-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    database: mongoose.connection.name || 'Not connected'
  });
});

// Database status route
app.get('/api/db-status', async (req, res) => {
  const states = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };
  
  const status = {
    status: states[mongoose.connection.readyState],
    database: mongoose.connection.name || 'Not connected',
    host: mongoose.connection.host || 'Unknown',
    port: mongoose.connection.port || 'Unknown',
    readyState: mongoose.connection.readyState,
    timestamp: new Date().toISOString()
  };
  
  // Test ping if connected
  if (mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.db.admin().ping();
      status.ping = 'Success';
    } catch (error) {
      status.ping = 'Failed: ' + error.message;
    }
  }
  
  res.json(status);
});

// Get all users (for testing - remove in production)
app.get('/api/users', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'Database connection unavailable' });
    }
    
    const users = await User.find({}, { password: 0 }); // Exclude password field
    res.json({
      count: users.length,
      users: users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }))
    });
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Get user count
app.get('/api/user-count', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'Database connection unavailable' });
    }
    
    const count = await User.countDocuments();
    res.json({ userCount: count });
  } catch (error) {
    console.error('❌ Error counting users:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

const careerData = {
  'B.A.': {
    careers: [
      'Civil Services Officer', 'Teacher/Professor', 'Journalist', 'Content Writer', 
      'Social Worker', 'Human Resources Manager', 'Public Relations Officer', 
      'Translator', 'Museum Curator', 'Event Manager', 'Travel Writer', 
      'Digital Marketing Specialist', 'Counselor', 'NGO Worker'
    ],
    higherStudies: [
      'M.A. (Various Subjects)', 'MBA', 'B.Ed./M.Ed.', 'LLB/LLM', 
      'Mass Communication', 'Social Work (MSW)', 'Psychology', 
      'Public Administration', 'International Relations', 'Journalism'
    ],
    exams: [
      'UPSC Civil Services', 'State PSC', 'UGC NET/JRF', 'Bank PO/Clerk', 
      'SSC CGL/CHSL', 'Railway Exams', 'CLAT (Law)', 'CTET/TET', 
      'Insurance Exams', 'Defence Services'
    ]
  },
  'B.Sc.': {
    careers: [
      'Research Scientist', 'Lab Technician', 'Data Analyst', 'Quality Control Officer',
      'Environmental Scientist', 'Biotechnologist', 'Software Developer', 
      'Medical Representative', 'Food Technologist', 'Forensic Expert',
      'Weather Forecaster', 'Agricultural Officer', 'Pharmacist', 'Nurse'
    ],
    higherStudies: [
      'M.Sc. (Various Subjects)', 'B.Tech/M.Tech', 'MBA', 'B.Ed./M.Ed.',
      'Medical (MBBS/BDS)', 'Pharmacy (B.Pharm)', 'Biotechnology', 
      'Environmental Science', 'Data Science', 'Bioinformatics'
    ],
    exams: [
      'GATE', 'UGC NET/JRF', 'CSIR NET', 'NEET (Medical)', 
      'Banking Exams', 'SSC CGL', 'Railway Exams', 'ISRO', 
      'DRDO', 'State PSC', 'Forest Service', 'Agricultural Services'
    ]
  },
  'B.Com.': {
    careers: [
      'Chartered Accountant', 'Financial Analyst', 'Tax Consultant', 'Banking Officer',
      'Investment Advisor', 'Insurance Agent', 'Auditor', 'Cost Accountant',
      'Financial Planner', 'Business Analyst', 'Stock Broker', 'Credit Analyst',
      'Budget Analyst', 'Loan Officer', 'Compliance Officer'
    ],
    higherStudies: [
      'M.Com.', 'MBA (Finance/Marketing)', 'CA (Chartered Accountancy)', 
      'CS (Company Secretary)', 'CMA (Cost Management)', 'CFA', 
      'Financial Risk Management', 'International Business', 'Banking & Finance'
    ],
    exams: [
      'Bank PO/Clerk', 'SSC CGL/CHSL', 'CA Foundation/Inter/Final', 
      'CS Foundation/Executive/Professional', 'CMA Foundation/Inter/Final',
      'Insurance Exams', 'Railway Accounts', 'Income Tax Inspector', 
      'Customs & Central Excise', 'State PSC'
    ]
  }
};

// Auth routes
app.post('/api/signup', async (req, res) => {
  try {
    console.log('Signup request received:', { ...req.body, password: '[HIDDEN]' });
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'Database connection unavailable' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    const savedUser = await user.save();
    
    // Log detailed user creation info
    console.log('✅ User created successfully:');
    console.log('   - ID:', savedUser._id);
    console.log('   - Name:', savedUser.name);
    console.log('   - Email:', savedUser.email);
    console.log('   - Created At:', savedUser.createdAt);
    console.log('   - Password Hash Length:', savedUser.password.length);
    
    const token = jwt.sign({ userId: savedUser._id }, 'career-path-secret-key', { expiresIn: '7d' });
    res.json({ token, user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } });
  } catch (error) {
    console.error('❌ Signup error:', error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'User already exists' });
    } else {
      res.status(500).json({ error: 'Server error: ' + error.message });
    }
  }
});

app.post('/api/login', async (req, res) => {
  try {
    console.log('Login request received:', { ...req.body, password: '[HIDDEN]' });
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'Database connection unavailable' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Login failed: User not found for email:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    console.log('🔍 Found user in database:');
    console.log('   - ID:', user._id);
    console.log('   - Name:', user.name);
    console.log('   - Email:', user.email);
    console.log('   - Created At:', user.createdAt);
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Login failed: Password mismatch for email:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, 'career-path-secret-key', { expiresIn: '7d' });
    console.log('✅ User logged in successfully:', user.email);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

app.get('/api/degrees', (req, res) => {
  res.json(Object.keys(careerData));
});

app.get('/api/career-paths/:degree', (req, res) => {
  const degree = req.params.degree;
  res.json(careerData[degree] || {});
});

// Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are a professional career counselor chatbot. Help students with career guidance, course selection, and educational planning. 

Student's message: "${message}"
Context: ${context || 'General career inquiry'}

Provide helpful, encouraging, and specific advice. Keep responses concise but informative.`;
    
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Sorry, I am currently unavailable. Please try again later.' });
  }
});

app.post('/api/ai-guidance', async (req, res) => {
  try {
    const { interests, degree } = req.body;
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.6,
      }
    });
    
    const prompt = `Based on interests: "${interests}" and ${degree} degree, provide short career advice:

TOP 3 CAREERS:
1. [Career] - ₹X-Y LPA
2. [Career] - ₹X-Y LPA  
3. [Career] - ₹X-Y LPA

SKILLS NEEDED:
• [Skill 1]
• [Skill 2]
• [Skill 3]
• [Skill 4]

NEXT STEPS:
• [Action 1]
• [Action 2]
• [Action 3]

Keep it very short and practical.`;
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 8000)
    );
    
    const result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise
    ]);
    
    res.json({ guidance: result.response.text() });
  } catch (error) {
    console.error('AI guidance error:', error);
    const fallbackGuidance = `TOP 3 CAREERS:
1. Software Developer - ₹4-15 LPA
2. Business Analyst - ₹5-18 LPA
3. Digital Marketer - ₹3-12 LPA

SKILLS NEEDED:
• Communication skills
• Digital literacy
• Problem-solving
• Teamwork

NEXT STEPS:
• Research these careers online
• Take relevant online courses
• Build a portfolio/resume
• Apply for internships`;
    
    res.json({ guidance: fallbackGuidance });
  }
});

// Career roadmap endpoint
app.post('/api/career-roadmap', async (req, res) => {
  try {
    const { career, degree } = req.body;
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.5,
      }
    });
    
    const prompt = `Create a career roadmap for ${career}:

**Overview:** Brief role description (1-2 lines)

**Timeline:**
• 0-2 years: Entry role, ₹X-Y LPA, main tasks
• 2-5 years: Mid role, ₹X-Y LPA, responsibilities  
• 5+ years: Senior role, ₹X-Y LPA, leadership

**Key Skills:** List 5-6 important skills

**Certifications:** List 3-4 relevant certifications

**Top Companies:** Name 5-6 hiring companies

**Next Steps:** 3-4 immediate actions to start

Keep it concise and practical with Indian salary ranges.`;
    
    // Reduced timeout for faster response
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 10000)
    );
    
    const result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise
    ]);
    
    res.json({ roadmap: result.response.text() });
  } catch (error) {
    console.error('Roadmap error:', error);
    if (error.message === 'Request timeout') {
      res.status(408).json({ error: 'The AI is taking too long to respond. Please try again with a simpler career goal.' });
    } else {
      res.status(500).json({ error: 'Career roadmap unavailable. Please try again later.' });
    }
  }
});

// Skills assessment endpoint
app.post('/api/skills-assessment', async (req, res) => {
  try {
    const { skills, interests, degree } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Analyze this student profile:
Degree: ${degree}
Current Skills: ${skills}
Interests: ${interests}

Provide:
1. Skill gap analysis
2. Recommended skills to develop
3. Learning resources and courses
4. Timeline for skill development
5. Career matches based on current profile

Be specific and actionable.`;
    
    const result = await model.generateContent(prompt);
    res.json({ assessment: result.response.text() });
  } catch (error) {
    console.error('Assessment error:', error);
    res.status(500).json({ error: 'Skills assessment unavailable. Please try again later.' });
  }
});

// Career suggestions endpoint
app.post('/api/career-suggestions', async (req, res) => {
  try {
    const { degree } = req.body;
    
    // Provide immediate fallback data for faster response
    const fallbackCareers = {
      'B.Tech': [
        {"name": "Software Developer", "growth": "High", "demand": "Very High"},
        {"name": "Data Scientist", "growth": "Very High", "demand": "High"},
        {"name": "DevOps Engineer", "growth": "High", "demand": "High"},
        {"name": "AI/ML Engineer", "growth": "Very High", "demand": "High"},
        {"name": "Cybersecurity Analyst", "growth": "High", "demand": "High"},
        {"name": "Product Manager", "growth": "High", "demand": "Medium"}
      ],
      'B.Sc': [
        {"name": "Data Analyst", "growth": "High", "demand": "High"},
        {"name": "Research Scientist", "growth": "Medium", "demand": "Medium"},
        {"name": "Quality Analyst", "growth": "Medium", "demand": "High"},
        {"name": "Lab Technician", "growth": "Medium", "demand": "High"},
        {"name": "Environmental Consultant", "growth": "High", "demand": "Medium"},
        {"name": "Biotech Specialist", "growth": "High", "demand": "Medium"}
      ],
      'B.Com': [
        {"name": "Financial Analyst", "growth": "High", "demand": "High"},
        {"name": "Digital Marketing Manager", "growth": "Very High", "demand": "High"},
        {"name": "Business Analyst", "growth": "High", "demand": "High"},
        {"name": "Investment Advisor", "growth": "Medium", "demand": "High"},
        {"name": "Tax Consultant", "growth": "Medium", "demand": "High"},
        {"name": "Banking Officer", "growth": "Medium", "demand": "High"}
      ],
      'B.A': [
        {"name": "Content Writer", "growth": "High", "demand": "High"},
        {"name": "Digital Marketing Specialist", "growth": "Very High", "demand": "High"},
        {"name": "HR Executive", "growth": "Medium", "demand": "High"},
        {"name": "Social Media Manager", "growth": "High", "demand": "High"},
        {"name": "Journalist", "growth": "Low", "demand": "Medium"},
        {"name": "Civil Services Officer", "growth": "Medium", "demand": "Medium"}
      ],
      'BBA': [
        {"name": "Business Development Manager", "growth": "High", "demand": "High"},
        {"name": "Marketing Manager", "growth": "High", "demand": "High"},
        {"name": "Operations Manager", "growth": "Medium", "demand": "High"},
        {"name": "Sales Manager", "growth": "Medium", "demand": "High"},
        {"name": "Project Manager", "growth": "High", "demand": "High"},
        {"name": "Startup Founder", "growth": "Very High", "demand": "Medium"}
      ],
      'BCA': [
        {"name": "Web Developer", "growth": "High", "demand": "Very High"},
        {"name": "Mobile App Developer", "growth": "High", "demand": "High"},
        {"name": "Software Tester", "growth": "Medium", "demand": "High"},
        {"name": "Database Administrator", "growth": "Medium", "demand": "High"},
        {"name": "System Analyst", "growth": "Medium", "demand": "Medium"},
        {"name": "IT Consultant", "growth": "High", "demand": "Medium"}
      ]
    };
    
    // Return fallback data immediately for better performance
    const careers = fallbackCareers[degree] || fallbackCareers['B.Tech'];
    res.json({ careers });
    
  } catch (error) {
    console.error('Career suggestions error:', error);
    res.status(500).json({ error: 'Career suggestions unavailable.', careers: [] });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Career Guidance Server running on port ${PORT}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`📊 API Endpoints available:`);
  console.log(`   - GET /api/test (Server status)`);
  console.log(`   - GET /api/db-status (Database status)`);
  console.log(`   - GET /api/users (All users - for testing)`);
  console.log(`   - GET /api/user-count (User count)`);
  console.log(`   - POST /api/signup (User registration)`);
  console.log(`   - POST /api/login (User authentication)`);
  console.log(`   - GET /api/degrees`);
  console.log(`   - GET /api/career-paths/:degree`);
  console.log(`   - POST /api/chat`);
  console.log(`   - POST /api/ai-guidance`);
  console.log(`   - POST /api/career-roadmap`);
  console.log(`   - POST /api/skills-assessment`);
  console.log(`\n🔗 Test endpoints:`);
  console.log(`   - Server: http://localhost:${PORT}/api/test`);
  console.log(`   - Users: http://localhost:${PORT}/api/users`);
  console.log(`   - Count: http://localhost:${PORT}/api/user-count`);
});