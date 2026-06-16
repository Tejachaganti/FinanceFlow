import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppShell = () => (
  <div className="min-h-screen p-4 md:p-6">
    <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="space-y-4">
        <Topbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  </div>
);

export default AppShell;
