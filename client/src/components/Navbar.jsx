import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <nav className="border-b border-surface-border bg-surface-light/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg text-text-primary">
          MERN<span className="text-accent">Auth</span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-text-secondary hover:text-text-primary transition-colors hidden sm:inline">
                Dashboard
              </Link>
              <Link to="/profile" className="text-sm text-text-secondary hover:text-text-primary transition-colors hidden sm:inline">
                Profile
              </Link>
              <Link to="/settings" className="text-sm text-text-secondary hover:text-text-primary transition-colors hidden sm:inline">
                Settings
              </Link>
              <span className="text-sm text-text-secondary hidden md:inline">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1.5 rounded-md bg-surface-border hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm px-3 py-1.5 rounded-md bg-accent hover:bg-accent-hover transition-colors text-white"
              >
                Sign Up
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
