import { motion } from "framer-motion";
import { Satellite } from "lucide-react";

const OrbitAnimation = () => {
  return (
    <div className="relative mx-auto h-64 w-64">
      {/* Orbit Rings */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      <div className="absolute inset-8 rounded-full border-2 border-primary/30" />
      <div className="absolute inset-16 rounded-full border-2 border-primary/40" />
      
      {/* Orbiting Satellite */}
      <motion.div
        className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center 128px" }}
      >
        <div className="rounded-full bg-primary violet-glow h-4 w-4" />
      </motion.div>
      
      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Satellite className="h-16 w-16 text-primary" />
      </div>
      
      {/* Pulsing Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/5"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
};

export default OrbitAnimation;
