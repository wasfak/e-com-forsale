"use client";
import { motion } from "framer-motion";
export default function Template({ children }) {
  return (
    <>
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen z-30 bg-[#ed7966]"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen z-20 bg-white"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.7, duration: 1, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen z-10 bg-black"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.9, duration: 1, ease: "easeInOut" }}
      />
      {children}
    </>
  );
}
