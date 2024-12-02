import { motion } from "framer-motion";

export function LoadingOverlay() {
  return (
    <div className="bg-zinc-900/90 absolute h-full w-full z-10 text-white text-xl flex flex-col justify-center items-center">
      <motion.div
        className="bg-white h-8 w-8"
        animate={{
          scale: [1, 1.5, 1.5, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{ repeat: Infinity, duration: 3 }}
      ></motion.div>
      <span className="mt-8">⚡Let us cook⚡</span>
    </div>
  );
}
