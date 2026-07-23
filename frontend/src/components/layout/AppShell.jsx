import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppShell = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-72 transform transition-transform duration-300 lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>

        <div className={`grid gap-6 transition-[grid-template-columns] duration-300 ${sidebarCollapsed ? "lg:grid-cols-[88px_1fr]" : "lg:grid-cols-[280px_1fr]"}`}>
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((value) => !value)} />
          </div>

          {/* Main Content */}
          <div className="flex min-h-[calc(100vh-3rem)] flex-col gap-6">
            <Topbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            <main
              className="flex-1 rounded-3xl border p-4 md:p-6 transition-all duration-300"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShell;
