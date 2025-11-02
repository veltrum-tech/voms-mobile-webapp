import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

const ChangeOwnershipView = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white h-full relative max-w-[720px] mx-auto p-4"
    >
      <Outlet />
    </motion.div>
  );
};

export { ChangeOwnershipView };