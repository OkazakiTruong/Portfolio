/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

interface WaveTextProps {
  text: string;
}

export default function WaveText({ text }: WaveTextProps) {
  return (
    <div className="text-2xl font-bold flex space-x-1">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{ 
            y: [0, -10, 0],
            opacity: 1,
            scale: 1,
            color: ['#60A5FA', '#818CF8', '#60A5FA'] // Blue to indigo gradient
          }}
          whileHover={{
            scale: 1.2,
            rotate: [0, 10, -10, 0],
            transition: { duration: 0.3 }
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
            delay: index * 0.1,
            color: {
              repeat: Infinity,
              duration: 2
            }
          }}
          className="cursor-pointer inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}