import { Link ,useNavigate} from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";

import toast from "react-hot-toast";
import Logo from "../common/Logo";
import ThemeToggle from "../common/ThemeToggle";
import { logoutUser } from "../../redux/auth/authThunk";

function Navbar() {
  // ✅ Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // ✅ Logout handler
  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      toast.success("Logged out successfully!");
      navigate("/", {
        replace: true,
      });
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 border-b border-base-200 bg-base-100/80 px-6 backdrop-blur-xl">
      {/* Left */}
      <div className="navbar-start">
        {/* Mobile */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <Menu size={22} />
          </label>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-[100] mt-3 w-56 rounded-box bg-base-100 p-2 shadow-xl"
          >
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <a>Features</a>
            </li>

            <li>
              <a>Pricing</a>
            </li>

            <li>
              <a>Enterprise</a>
            </li>

            <li>
              <a>Resources</a>
            </li>

            {isAuthenticated && (
              <li>
                <Link to="/dashboard">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        <Logo />
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          <li>
            <a>Features</a>
          </li>

          <li>
            <a>Pricing</a>
          </li>

          <li>
            <a>Enterprise</a>
          </li>

          <li>
            <a>Resources</a>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-2">
        <ThemeToggle />

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="btn btn-ghost"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-primary"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="btn btn-ghost"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-content">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[100] mt-3 w-64 rounded-box bg-base-100 p-2 shadow-xl"
              >
                <li className="menu-title">
                  <span>{user?.fullName}</span>
                  <span className="text-xs font-normal text-base-content/60">
                    {user?.email}
                  </span>
                </li>

                <li>
                  <button>
                    <User size={16} />
                    Profile
                  </button>
                </li>

                <li>
                  <Link to="/dashboard">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                </li>

                <li>
                  {/* ✅ Updated logout button with onClick */}
                  <button onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;