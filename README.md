# 🎓 CareerPath - Professional Career Guidance Platform

A comprehensive digital platform that helps students make informed career decisions using AI-powered guidance, interactive tools, and detailed career roadmaps.

## ✨ Key Features

### 🔍 **Career Exploration**
- **Degree-to-Career Mapping**: Comprehensive career options for B.A., B.Sc., B.Com., and more
- **Visual Career Paths**: Direct careers, higher studies, and competitive exams
- **Interactive Selection**: User-friendly degree cards with detailed information

### 📊 **Smart Comparison Tool**
- **Side-by-Side Analysis**: Compare multiple degrees simultaneously
- **Detailed Metrics**: Career count, study options, and exam opportunities
- **Easy Management**: Add/remove degrees from comparison

### 🤖 **AI-Powered Assistance**
- **Personalized Guidance**: AI recommendations based on interests and degree
- **Real-time Chatbot**: 24/7 career counseling assistant
- **Smart Responses**: Context-aware career advice

### 🎯 **Skills Assessment**
- **Gap Analysis**: Identify skill gaps for chosen career paths
- **Development Roadmap**: Personalized skill development plans
- **Learning Resources**: Recommended courses and certifications

### 🗺️ **Career Roadmaps**
- **Detailed Progression**: Step-by-step career advancement paths
- **Salary Insights**: Expected compensation at different levels
- **Industry Focus**: Top companies and sectors to target

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and setup:**
```bash
git clone <repository-url>
cd career_path
```

2. **Install all dependencies:**
```bash
npm run install-all
```

3. **Start the application:**
```bash
npm run dev
```

4. **Access the platform:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🛠️ Tech Stack

- **Frontend**: React.js with modern hooks
- **Backend**: Node.js + Express.js
- **AI Integration**: Google Gemini 1.5 Flash
- **Styling**: Professional CSS with responsive design
- **Real-time Features**: WebSocket-like chat functionality

## 📱 User Experience

### Professional Design
- Clean, gradient-free interface
- Responsive design for all devices
- Intuitive navigation with tab-based layout
- Professional color scheme and typography

### Interactive Features
- **Floating Chatbot**: Always available career assistant
- **Loading States**: Professional feedback during operations
- **Error Handling**: Graceful fallbacks and user-friendly messages
- **Quick Actions**: One-click career exploration

## 🎯 Target Audience

- **High School Students**: Choosing streams after Class 10/12
- **College Students**: Exploring career options during graduation
- **Career Changers**: Professionals seeking new opportunities
- **Parents & Counselors**: Supporting student career decisions

## 📊 API Endpoints

### Core Endpoints
- `GET /api/degrees` - Available degree programs
- `GET /api/career-paths/:degree` - Career options for specific degree

### AI-Powered Endpoints
- `POST /api/chat` - Real-time chatbot conversations
- `POST /api/ai-guidance` - Personalized career recommendations
- `POST /api/career-roadmap` - Detailed career progression paths
- `POST /api/skills-assessment` - Skill gap analysis and development plans

## 🔧 Configuration

### Environment Variables
```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

### Customization
- Update career data in `backend/server.js`
- Modify styling in `frontend/src/App.css`
- Add new components in `frontend/src/components/`

## 🌟 Key Benefits

1. **Reduces Career Confusion**: Clear, visual career pathways
2. **Informed Decision Making**: Data-driven career recommendations
3. **Personalized Guidance**: AI-powered individual counseling
4. **Comprehensive Coverage**: Multiple degree programs and career options
5. **Professional Interface**: User-friendly design for all age groups

## 🚀 Future Enhancements

- **Industry Partnerships**: Real job market data integration
- **Video Counseling**: Live sessions with career experts
- **Progress Tracking**: Personal career development dashboard
- **Mobile App**: Native iOS/Android applications
- **Multi-language Support**: Regional language options

## 📞 Support

For technical support or feature requests, please contact the development team or create an issue in the repository.

---

**© 2024 CareerPath Platform | Empowering Students to Make Informed Career Choices**