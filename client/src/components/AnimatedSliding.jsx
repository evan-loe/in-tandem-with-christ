import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100vw" : "-100vw",
  }),
  active: {
    x: 0,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100vw" : "100vw",
  }),
};

const AnimatedSliding = ({ children, direction, ...props }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial="enter"
        animate="active"
        exit="exit"
        transition={{ duration: 0.5, ease: [0.92, 0.03, 0.28, 1.13] }}
        variants={variants}
        custom={direction}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedSliding;
