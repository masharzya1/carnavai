import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ChartCard from '../components/ChartCard';
import ReportCard from '../components/ReportCard';
import Spinner from '../components/Spinner';
import { motion } from 'framer-motion';

export default function Result({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const docRef = doc(db, 'careerReports', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (!user || data.uid !== user.uid) {
            alert('Unauthorized access');
            navigate('/');
            return;
          }
          setReport(data);
        } else {
          alert('Report not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching report:', error);
        alert('Failed to load report');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReport();
    } else {
      navigate('/login');
    }
  }, [id, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner text="Loading your career analysis..." />
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Career Analysis Report
          </h1>
          <p className="text-xl opacity-80">{report.targetJob}</p>
          <div className="flex justify-center gap-4 mt-4 text-sm opacity-70">
            <span>📚 {report.education}</span>
            <span>📍 {report.location}</span>
            {report.experience && <span>💼 {report.experience} years</span>}
          </div>
        </motion.div>

        {/* Job Possibility Chart */}
        <div className="mb-8">
          <ChartCard jobPossibility={report.jobPossibility} />
        </div>

        {/* Education Gap */}
        <div className="mb-8">
          <ReportCard title="Education Gap Analysis" icon="🎓" delay={0.1}>
            <div className="space-y-3">
              <div>
                <p className="text-sm opacity-70">Required Education:</p>
                <p className="text-lg font-semibold">{report.educationGap.required}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Your Education:</p>
                <p className="text-lg font-semibold">{report.educationGap.userHas}</p>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-2">Gap Analysis:</p>
                <p className="text-base leading-relaxed">{report.educationGap.gap}</p>
              </div>
              {report.educationGap.steps && report.educationGap.steps.length > 0 && (
                <div>
                  <p className="text-sm opacity-70 mb-2">Steps to Fill the Gap:</p>
                  <ul className="space-y-2">
                    {report.educationGap.steps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ReportCard>
        </div>

        {/* Skills Gap */}
        <div className="mb-8">
          <ReportCard title="Skills Gap Analysis" icon="💡" delay={0.2}>
            <div className="space-y-4">
              {report.skillsGap.missing && report.skillsGap.missing.length > 0 && (
                <div>
                  <p className="text-sm opacity-70 mb-3">Missing Skills:</p>
                  <div className="grid gap-3">
                    {report.skillsGap.missing.map((skill, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-lg">{skill.skill}</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            skill.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                            skill.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {skill.difficulty}
                          </span>
                        </div>
                        <p className="text-sm opacity-70">Time to learn: {skill.timeToLearn}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {report.skillsGap.certifications && report.skillsGap.certifications.length > 0 && (
                <div>
                  <p className="text-sm opacity-70 mb-2">Recommended Certifications:</p>
                  <ul className="space-y-2">
                    {report.skillsGap.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="text-purple-400">✓</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ReportCard>
        </div>

        {/* Migration Guide */}
        {report.migrationGuide && (
          <div className="mb-8">
            <ReportCard title="International Migration Guide" icon="✈️" delay={0.3}>
              <div className="space-y-3">
                {report.migrationGuide.languageRequirements && (
                  <div>
                    <p className="text-sm opacity-70">Language Requirements:</p>
                    <p className="text-base">{report.migrationGuide.languageRequirements}</p>
                  </div>
                )}
                {report.migrationGuide.visaRequirements && (
                  <div>
                    <p className="text-sm opacity-70">Visa Requirements:</p>
                    <p className="text-base">{report.migrationGuide.visaRequirements}</p>
                  </div>
                )}
                {report.migrationGuide.certifications && report.migrationGuide.certifications.length > 0 && (
                  <div>
                    <p className="text-sm opacity-70 mb-2">International Certifications:</p>
                    <ul className="space-y-2">
                      {report.migrationGuide.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="text-purple-400">✓</span>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ReportCard>
          </div>
        )}

        {/* Career Roadmap */}
        <div className="mb-8">
          <ReportCard title="Career Roadmap" icon="🗺️" delay={0.4}>
            <div className="space-y-6">
              {/* Short Term */}
              {report.roadmap.shortTerm && (
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">
                    Short Term ({report.roadmap.shortTerm.duration})
                  </h3>
                  <ul className="space-y-2">
                    {report.roadmap.shortTerm.tasks.map((task, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-400 mt-1">→</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mid Term */}
              {report.roadmap.midTerm && (
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                    Mid Term ({report.roadmap.midTerm.duration})
                  </h3>
                  <ul className="space-y-2">
                    {report.roadmap.midTerm.tasks.map((task, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-yellow-400 mt-1">→</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Long Term */}
              {report.roadmap.longTerm && (
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    Long Term ({report.roadmap.longTerm.duration})
                  </h3>
                  <ul className="space-y-2">
                    {report.roadmap.longTerm.tasks.map((task, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">→</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ReportCard>
        </div>

        {/* Opportunities */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Current Opportunities */}
          {report.currentOpportunities && report.currentOpportunities.length > 0 && (
            <ReportCard title="Current Opportunities" icon="🎯" delay={0.5}>
              <ul className="space-y-2">
                {report.currentOpportunities.map((opp, index) => (
                  <li key={index} className="flex items-center space-x-2 bg-white/5 rounded-lg p-3">
                    <span className="text-green-400">✓</span>
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            </ReportCard>
          )}

          {/* Future Opportunities */}
          {report.futureOpportunities && report.futureOpportunities.length > 0 && (
            <ReportCard title="Future Opportunities" icon="🚀" delay={0.6}>
              <ul className="space-y-2">
                {report.futureOpportunities.map((opp, index) => (
                  <li key={index} className="flex items-center space-x-2 bg-white/5 rounded-lg p-3">
                    <span className="text-purple-400">→</span>
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            </ReportCard>
          )}
        </div>

        {/* Risk Forecast */}
        {report.riskForecast && (
          <div className="mb-8">
            <ReportCard title="Automation Risk Forecast" icon="⚠️" delay={0.7}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm opacity-70">Risk Level:</span>
                  <span className={`px-4 py-2 rounded-full font-semibold ${
                    report.riskForecast.level === 'Low' ? 'bg-green-500/20 text-green-300' :
                    report.riskForecast.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {report.riskForecast.level}
                  </span>
                </div>
                <p className="text-base leading-relaxed">{report.riskForecast.explanation}</p>
              </div>
            </ReportCard>
          </div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg glass hover:neon-glow transition-smooth"
          >
            Generate New Analysis
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-smooth"
          >
            View All Reports
          </button>
        </motion.div>
      </div>
    </div>
  );
}
