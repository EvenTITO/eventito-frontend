import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export function MotionMain({ children }) {
  return (
    <motion.main
      className="max-w-4xl mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.main>
  );
}

export function MotionDiv({ children, className }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export function MotionH1({ children, className }) {
  return (
    <motion.h1 className={className} variants={itemVariants}>
      {children}
    </motion.h1>
  );
}

export function MotionH2({ children, className }) {
  return (
    <motion.h1 className={className} variants={itemVariants}>
      {children}
    </motion.h1>
  );
}

export function MotionP({ children, className }) {
  return (
    <motion.h1 className={className} variants={itemVariants}>
      {children}
    </motion.h1>
  );
}
