import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_MESSAGES = [
  "인생 기록 불러오는 중...",
  "소중한 순간들을 정리하고 있어요...",
  "타임라인을 준비 중입니다...",
  "당신의 발자취를 돌아보며...",
  "기억의 조각들을 맞추는 중..."
];

interface LoadingScreenProps {
  messages?: string[];
  interval?: number;
}

export const LoadingScreen = ({
  messages = DEFAULT_MESSAGES,
  interval = 2500
}: LoadingScreenProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [messages.length, interval]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-500 overflow-hidden">
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          className="absolute w-80 h-80 bg-primary/30 rounded-full blur-[100px] -z-10"
        />

        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full relative z-10"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary/20 rounded-full blur-md"
          />
        </div>

        <div className="h-10 flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="text-lg font-bold text-surface-800 dark:text-surface-100 tracking-tight"
            >
              {messages[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-8 w-40 h-[3px] bg-surface-200 dark:bg-surface-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
