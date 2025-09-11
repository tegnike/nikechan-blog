import { motion } from "motion/react";

export function HeroImageOverlay() {
  return (
    <div className="absolute top-0 right-0 w-1/2 z-20 pointer-events-none hidden lg:block" style={{ height: '120vh' }}>
      <div className="relative h-full">
        {/* Character Image replacement with decorative element */}
        <motion.div
          className="absolute top-8 right-8 w-96 h-96 z-10"
          initial={{ scale: 1.02, opacity: 0.9 }}
          animate={{ scale: [1.02, 1.05, 1.02], opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.06, y: -5 }}
        >
          <img
            src="/images/models/live2d_tp.png"
            alt="Nike Chan"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}