# Career Navigator AI 🚀

Modern, AI-powered career analysis platform that helps users discover their career path with personalized insights, skill gap analysis, and comprehensive roadmaps.

## ✨ Features

### Core Functionality
- **AI-Powered Career Analysis** - Leverages Google Gemini AI for intelligent career insights
- **Job Possibility Prediction** - Visual chart showing possibilities in Bangladesh, International markets
- **Gap Analysis** - Identifies missing education, skills, and certifications
- **Personalized Roadmap** - Short-term, mid-term, and long-term career planning
- **Automation Risk Forecast** - Analyzes job security and future-proofing
- **Migration Guide** - International job requirements including visa, language, and certifications

### User Experience
- **Dark-First Design** - Beautiful dark theme with light mode toggle
- **Glassmorphism UI** - Modern glass-effect cards with backdrop blur
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Mobile-first, works on all devices
- **Interactive Charts** - Beautiful doughnut charts using Chart.js

### Technical Features
- **Firebase Authentication** - Secure email/password login
- **Firestore Database** - Persistent storage of career reports
- **User Dashboard** - View all previous analyses
- **Real-time Updates** - Instant feedback and loading states

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router v7** - Client-side routing
- **Chart.js + react-chartjs-2** - Data visualization

### Backend & Services
- **Firebase Authentication** - User management
- **Firestore** - NoSQL database
- **Google Gemini AI** - Career analysis generation

## 📦 Installation

### Prerequisites
- Node.js 18+ or compatible runtime
- pnpm (recommended) or npm

### Setup Steps

1. **Clone or extract the project**
   ```bash
   cd career-navigator-ai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment variables are already configured in `.env`**
   ```
   VITE_GEMINI_API_KEY=AIzaSyAlr3UpSCcsTfdZ1uOOnTMAn1cOKtQDGNs
   VITE_FIREBASE_API_KEY=AIzaSyAbVaJBrki042rkw3Eo3UoyTdMMR7lejxo
   VITE_FIREBASE_AUTH_DOMAIN=carnavai.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=carnavai
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🚀 Usage

### First Time User

1. **Sign Up**
   - Click "Sign up" link on login page
   - Enter email and password (min 6 characters)
   - Account is created automatically

2. **Generate Career Analysis**
   - Fill in the form:
     - Target Job (e.g., "Web Developer")
     - Location Preference (Bangladesh/International)
     - Current Education Level
     - Current Skills (comma-separated)
     - Years of Experience (optional)
   - Click "Generate My Career Analysis"

3. **View Results**
   - Job Possibility Chart
   - Education Gap Analysis
   - Skills Gap with learning timeline
   - Migration Guide (for international)
   - Career Roadmap (short/mid/long term)
   - Current & Future Opportunities
   - Automation Risk Forecast

4. **Dashboard**
   - View all previous reports
   - Click any report to see full details
   - Generate new analyses anytime

## 📁 Project Structure

```
career-navigator-ai/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Navigation header
│   │   ├── ThemeToggle.jsx      # Dark/Light mode toggle
│   │   ├── ChartCard.jsx        # Job possibility chart
│   │   ├── ReportCard.jsx       # Reusable report section
│   │   └── Spinner.jsx          # Loading indicator
│   ├── pages/
│   │   ├── Home.jsx             # Main input form
│   │   ├── Login.jsx            # Authentication
│   │   ├── Signup.jsx           # User registration
│   │   ├── Dashboard.jsx        # Reports list
│   │   └── Result.jsx           # Analysis results
│   ├── firebaseConfig.js        # Firebase setup
│   ├── api.js                   # Gemini AI integration
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── .env                         # Environment variables
├── vite.config.js               # Vite configuration
├── postcss.config.js            # PostCSS setup
└── package.json                 # Dependencies
```

## 🎨 Design System

### Colors
- **Primary Gradient**: Purple (#8B5CF6) to Pink (#EC4899)
- **Background Dark**: Navy (#0F172A) to Deep Purple (#1E1B4B)
- **Background Light**: White (#F8FAFC) to Light Blue (#E0E7FF)
- **Accent Colors**: Blue, Green, Red for data visualization

### Components
- **Glass Effect**: `rgba(255, 255, 255, 0.05)` with backdrop blur
- **Neon Glow**: Purple shadow on hover
- **Rounded Corners**: 2xl (16px) for cards
- **Smooth Transitions**: 300ms cubic-bezier

## 🔧 Configuration

### Firebase Setup
The project is already configured with Firebase credentials. If you need to use your own Firebase project:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Update `.env` with your credentials

### Gemini API
The project uses Google Gemini AI. To use your own API key:

1. Get API key from https://makersuite.google.com/app/apikey
2. Update `VITE_GEMINI_API_KEY` in `.env`

## 📊 Data Structure

### Firestore Collection: `careerReports`

```javascript
{
  uid: "user-id",
  targetJob: "Web Developer",
  location: "Bangladesh, International",
  education: "Honours",
  skills: "JavaScript, React, Node.js",
  experience: "2",
  jobPossibility: {
    bangladesh: 60,
    international: 35,
    none: 5
  },
  educationGap: {
    required: "Bachelor's Degree",
    userHas: "Honours",
    gap: "...",
    steps: [...]
  },
  skillsGap: {
    missing: [{skill, difficulty, timeToLearn}],
    certifications: [...]
  },
  migrationGuide: {...},
  roadmap: {
    shortTerm: {...},
    midTerm: {...},
    longTerm: {...}
  },
  currentOpportunities: [...],
  futureOpportunities: [...],
  riskForecast: {
    level: "Low/Medium/High",
    explanation: "..."
  },
  createdAt: timestamp
}
```

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

This creates optimized files in the `dist/` directory.

### Deploy Options

1. **Vercel** (Recommended)
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify**
   - Connect GitHub repo
   - Build command: `pnpm build`
   - Publish directory: `dist`

3. **Firebase Hosting**
   ```bash
   firebase init hosting
   firebase deploy
   ```

### Environment Variables
Don't forget to set environment variables in your hosting platform:
- `VITE_GEMINI_API_KEY`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`

## 🐛 Troubleshooting

### Common Issues

**Issue**: Tailwind styles not working
- **Solution**: Make sure `@tailwindcss/postcss` is installed and configured in `postcss.config.js`

**Issue**: Firebase authentication errors
- **Solution**: Check that Email/Password authentication is enabled in Firebase Console

**Issue**: Gemini API errors
- **Solution**: Verify API key is valid and has quota available

**Issue**: Charts not displaying
- **Solution**: Ensure Chart.js is properly registered in `ChartCard.jsx`

## 📝 License

This project is created for educational and portfolio purposes.

## 🤝 Contributing

This is a custom-built project. Feel free to fork and customize for your needs.

## 📧 Support

For issues or questions, please check the Firebase and Gemini AI documentation.

## 🎯 Future Enhancements

- [ ] PDF export of career reports
- [ ] Email notifications
- [ ] Social sharing
- [ ] Comparison between multiple career paths
- [ ] Industry-specific analysis
- [ ] Salary predictions
- [ ] Job board integration
- [ ] Mentor matching

---

**Built with ❤️ using React, Vite, Firebase, and Google Gemini AI**
