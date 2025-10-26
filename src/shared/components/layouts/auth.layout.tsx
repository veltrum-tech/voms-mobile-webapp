import { Outlet, useLocation } from "react-router-dom";
import { AuthBackground } from "./auth_background";
import { motion } from "framer-motion";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="relative w-full h-screen md:overflow-hidden">
      {/* Background behind everything */}
      <div className="absolute inset-0">
        <AuthBackground />
      </div>
      {/* Animated child routes */}
      <div className="relative flex items-center justify-center h-full">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="animate-[slideIn_0.2s_ease-out_0.3s_both]">
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export { AuthLayout };
