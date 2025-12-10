import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { generateCareerAnalysis } from '../api';
import Spinner from '../components/Spinner';

export default function Home({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    targetJob: '',
    location: [],
    education: '',
    skills: '',
    experience: ''
  });

  const handleLocationChange = (loc) => {
    setFormData(prev => ({
      ...prev,
      location: prev.location.includes(loc)
        ? prev.location.filter(l => l !== loc)
        : [...prev.location, loc]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    if (formData.location.length === 0) {
      alert('Please select at least one location preference');
      return;
    }

    setLoading(true);

    try {
      const locationStr = formData.location.join(', ');
      const analysis = await generateCareerAnalysis({
        ...formData,
        location: locationStr
      });

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'careerReports'), {
        uid: user.uid,
        targetJob: formData.targetJob,
        location: locationStr,
        education: formData.education,
        skills: formData.skills,
        experience: formData.experience,
        jobPossibility: analysis.jobPossibility,
        educationGap: analysis.educationGap,
        skillsGap: analysis.skillsGap,
        migrationGuide: analysis.migrationGuide,
        roadmap: analysis.roadmap,
        currentOpportunities: analysis.currentOpportunities,
        futureOpportunities: analysis.futureOpportunities,
        riskForecast: analysis.riskForecast,
        createdAt: serverTimestamp()
      });

      navigate(`/result/${docRef.id}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner text="Generating your career analysis..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Discover Your Career Path
          </h1>
          <p className="text-lg opacity-80">
            AI-powered career analysis to help you navigate your professional journey
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-6"
        >
          {/* Target Job */}
          <div>
            <label className="block text-sm font-medium mb-2">Target Job *</label>
            <input
              type="text"
              value={formData.targetJob}
              onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-purple-500 focus:outline-none transition-smooth"
              placeholder="e.g., Web Developer, Nurse, Data Scientist"
              required
            />
          </div>

          {/* Location Preference */}
          <div>
            <label className="block text-sm font-medium mb-2">Location Preference *</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.location.includes('Bangladesh')}
                  onChange={() => handleLocationChange('Bangladesh')}
                  className="w-5 h-5 rounded border-white/20 bg-white/10 checked:bg-purple-500"
                />
                <span>Bangladesh</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.location.includes('International')}
                  onChange={() => handleLocationChange('International')}
                  className="w-5 h-5 rounded border-white/20 bg-white/10 checked:bg-purple-500"
                />
                <span>International</span>
              </label>
            </div>
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-sm font-medium mb-2">Current Education Level *</label>
            <select
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-purple-500 focus:outline-none transition-smooth"
              required
            >
              <option value="">Select your education level</option>
              <option value="SSC">SSC</option>
              <option value="HSC">HSC</option>
              <option value="Diploma">Diploma</option>
              <option value="Honours">Honours</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          {/* Current Skills */}
          <div>
            <label className="block text-sm font-medium mb-2">Current Skills *</label>
            <textarea
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-purple-500 focus:outline-none transition-smooth"
              placeholder="e.g., JavaScript, React, Node.js, Communication, Problem Solving"
              rows="4"
              required
            />
            <p className="text-xs opacity-60 mt-1">Separate skills with commas</p>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium mb-2">Years of Experience (Optional)</label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-purple-500 focus:outline-none transition-smooth"
              placeholder="0"
              min="0"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold text-lg neon-glow transition-smooth"
          >
            Generate My Career Analysis
          </motion.button>

          {!user && (
            <p className="text-center text-sm text-yellow-400">
              You need to login to generate career analysis
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}
