import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import router from "./config/routes";

const AuthProvider = () => {
  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <>
    
      <AuthProvider />
      <Toaster position="top-right" richColors />
    </>
  );
};

export default App;
