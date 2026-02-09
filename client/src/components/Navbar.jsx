import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../services/auth";

const Navbar = () => {
  const location = useLocation();
  const [dark, setDark] = useState(false);

   

   useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const navLink = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-indigo-600 shadow-md bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold text-indigo-600">Career AI</h1>

      <div className="flex items-center gap-2">
        <Link to="/" className={navLink("/")}>
          Home
        </Link>
        <Link to="/dashboard" className={navLink("/dashboard")}>
          History
        </Link>

        <button
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100"
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
        {/*Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="ml-2 text-xl"
          title="Toggle dark mode"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
