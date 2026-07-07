import {
  LayoutDashboard,
  Link2,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "../common/Logo";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "My Links",
      icon: Link2,
      path: "/dashboard",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/dashboard",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard",
    },
  ];

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-base-300 bg-base-100 lg:sticky lg:top-0 lg:flex lg:flex-col">

      {/* Logo */}
      <div className="border-b border-base-300 p-6">
        <Logo />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">

        <ul className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              </li>
            );
          })}

        </ul>

      </div>

      {/* Bottom User */}
      <div className="border-t border-base-300 p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-content">
            {user?.fullName?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">

            <p className="truncate font-semibold">
              {user?.fullName}
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;