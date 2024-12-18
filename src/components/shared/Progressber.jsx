"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        height: "4px",
        background: "#0000FF",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        transformOrigin: "0%",
        zIndex: 1000,
      }}
    />
  );
};

export default ProgressBar;
