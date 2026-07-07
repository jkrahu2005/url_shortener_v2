import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">

          <Topbar />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;