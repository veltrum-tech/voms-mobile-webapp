import { Outlet } from "react-router-dom";
import { MainBackground } from "./main_background";

const RootLayout = () => {

  return (
    <div className="overflow-auto [scrollbar-width:none] relative w-screen h-screen overflow-y-hidden">
      {/* Background layer - lowest z-index */}
      <div className="absolute inset-0 z-0 h-screen">
        <MainBackground />
      </div>

      {/* Main content area with top padding to account for fixed header - highest z-index */}
      <div className="relative z-10 w-full mt-20 h-[calc(100vh-15%)] flex md:pl-10 md:py-10 md:pr-10 ">
        <div className="w-full h-full overflow-y-scroll max-w-[720px] mx-auto p-4 [scrollbar-width:none]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { RootLayout };
