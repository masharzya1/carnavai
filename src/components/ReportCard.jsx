import { motion } from 'framer-motion';

export default function ReportCard({ title, icon, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-3xl">{icon}</div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
}
