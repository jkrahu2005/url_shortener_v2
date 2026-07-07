import { Bell } from "lucide-react";
import { useSelector } from "react-redux";

import ThemeToggle from "../common/ThemeToggle";

function Topbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome back,
            <span className="text-primary">
              {" "}
              {user?.fullName?.split(" ")[0]}
            </span>
            👋
          </h1>

          <p className="mt-1 text-sm text-base-content/60">
            Manage your shortened links and analytics.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end gap-3">

          <ThemeToggle />

          <button className="btn btn-ghost btn-circle">
            <Bell size={20} />
          </button>

        </div>

      </div>

    </header>
  );
}

export default Topbar;