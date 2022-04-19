import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export const ModalContainer = ({ children }) => {
  const { scrollPosition: topPos } = useSelector((state) => state.search);

  return (
    <motion.div
      initial={{
        y: window.innerHeight,
      }}
      animate={{
        y: 0,
      }}
      exit={{
        y: window.innerHeight,
      }}
      transition={{
        duration: 0.4,
      }}
      style={{
        top: `${topPos}px`,
        height: `100vh`,
        background: "rgba(249, 208, 251, 0.6)",
        backdropFilter: "blur(8px)",
      }}
      className={`absolute left-0 z-[10000] w-full p-4 flex justify-center items-center`}
    >
      {children}
    </motion.div>
  );
};
