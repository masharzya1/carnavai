import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { motion } from 'framer-motion';
import Spinner from '../components/Spinner';

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const q = query(
          collection(db, 'careerReports'),
          where('uid', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const reportsData = [];
        querySnapshot.forEach((doc) => {
          reportsData.push({ id: doc.id, ...doc.data() });
        });
        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner text="Loading your reports..." />
      </div>
    );
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            My Career Reports
          </h1>
          <p className="text-lg opacity-80">View all your career analysis reports</p>
        </motion.div>

        {reports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold mb-4">No Reports Yet</h2>
            <p className="text-lg opacity-70 mb-6">
              Generate your first career analysis to see it here
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold neon-glow transition-smooth"
            >
              Generate Career Analysis
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/result/${report.id}`)}
                className="glass rounded-2xl p-6 cursor-pointer hover:neon-glow transition-smooth"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {report.targetJob}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm opacity-70">
                      <span className="flex items-center gap-1">
                        📚 {report.education}
                      </span>
                      <span className="flex items-center gap-1">
                        📍 {report.location}
                      </span>
                      {report.experience && (
                        <span className="flex items-center gap-1">
                          💼 {report.experience} years
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        📅 {formatDate(report.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Job Possibility Indicators */}
                    <div className="flex gap-2">
                      {report.jobPossibility.bangladesh > 0 && (
                        <div className="text-center">
                          <div className="text-xs opacity-70 mb-1">BD</div>
                          <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-sm">
                            {report.jobPossibility.bangladesh}%
                          </div>
                        </div>
                      )}
                      {report.jobPossibility.international > 0 && (
                        <div className="text-center">
                          <div className="text-xs opacity-70 mb-1">Intl</div>
                          <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 font-semibold text-sm">
                            {report.jobPossibility.international}%
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Risk Level */}
                    {report.riskForecast && (
                      <div className={`px-4 py-2 rounded-full font-semibold text-sm ${
                        report.riskForecast.level === 'Low' ? 'bg-green-500/20 text-green-300' :
                        report.riskForecast.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        Risk: {report.riskForecast.level}
                      </div>
                    )}

                    <div className="text-2xl">→</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {reports.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-lg glass hover:neon-glow transition-smooth"
            >
              Generate New Analysis
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
