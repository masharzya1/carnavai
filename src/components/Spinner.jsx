import { motion } from 'framer-motion';

export default function Spinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
      />
      <p className="text-lg text-purple-400">{text}</p>
    </div>
  );
}
