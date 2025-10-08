import { Satellite } from "lucide-react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-4"
        >
          <Satellite className="h-16 w-16 text-primary violet-glow" />
        </motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-muted-foreground"
        >
          Loading satellite data...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
