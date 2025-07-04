
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-342px)] mx-2 mt-[64px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;