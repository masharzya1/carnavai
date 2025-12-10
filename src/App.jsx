import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Result from './pages/Result';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set dark mode as default
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
      document.body.className = 'dark';
    } else {
      document.body.className = localStorage.getItem('theme');
    }

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/result/:id" element={<Result user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
