import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // <-- Put your logo inside src/assets/

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname === "/admin";

  // Don't render navbar on admin page
  if (isAdminPage) {
    return null;
  }

  // Persist dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleNavClick = (id) => {
    if (isHomePage) {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      role="navigation"
      className="glass-dark backdrop-blur-lg fixed top-0 w-full z-50 border-b border-white/10"
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={logo}
            alt="Anvi Tiles & Decor Hub Logo"
            className="w-12 h-12 rounded-lg object-contain shadow-md"
          />
          <span className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
            Anvi Tiles & Decor Hub
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-semibold">
          <li>
            <Link to="/" className="relative group py-2">
              <span className="group-hover:text-purple-300 transition-colors duration-300">
                🏠 Home
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </li>
          <li>
            {isHomePage ? (
              <button
                onClick={() => handleNavClick("catalog")}
                className="relative group py-2 px-1"
              >
                <span className="group-hover:text-purple-300 transition-colors duration-300">
                  📋 Catalogue
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ) : (
              <Link to="/catalogue" className="relative group py-2 px-1">
                <span className="group-hover:text-purple-300 transition-colors duration-300">
                  📋 Catalogue
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            )}
          </li>
          <li>
            {isHomePage ? (
              <button
                onClick={() => handleNavClick("products")}
                className="relative group py-2 px-1"
              >
                <span className="group-hover:text-purple-300 transition-colors duration-300">
                  🎨 Products
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ) : (
              <Link to="/products" className="relative group py-2 px-1">
                <span className="group-hover:text-purple-300 transition-colors duration-300">
                  🎨 Products
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            )}
          </li>
          <li>
            {isHomePage ? (
              <button
                onClick={() => handleNavClick("about")}
                className="relative group py-2 px-1"
              >
                <span className="group-hover:text-purple-300 transition-colors duration-300">
                  🏢 About
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ) : (
              <Link to="/about" className="relative group py-2 px-1">
                <span className="group-hover:text-purple-300 transition-colors duration-300">
                  🏢 About
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            )}
          </li>
          <li>
            {isHomePage ? (
              <button
                onClick={() => handleNavClick("contact")}
                className="relative group py-2 px-1"
              >
                <span className="group-hover:text-purple-300 transition-colors duration-300">
                  📞 Contact
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ) : (
              <Link to="/contact" className="relative group py-2 px-1">
                <span className="group-hover:text-purple-300 transition-colors duration-300">
                  📞 Contact
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            )}
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="glass p-3 rounded-xl hover:bg-white/20 transition-all duration-300 group"
          >
            {darkMode ? (
              <Sun
                size={20}
                className="text-yellow-300 group-hover:animate-spin"
              />
            ) : (
              <Moon
                size={20}
                className="text-blue-300 group-hover:rotate-12 transition-transform"
              />
            )}
          </button>

          <Link
            to="/search"
            className="btn-primary hover-lift px-6 py-3 font-semibold flex items-center space-x-2"
          >
            <span>🔍</span>
            <span>Search</span>
          </Link>


        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className="md:hidden glass p-3 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden glass-dark backdrop-blur-lg border-t border-white/10">
          <ul className="flex flex-col space-y-2 p-6 text-white font-semibold">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <span>🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              {isHomePage ? (
                <button
                  onClick={() => {
                    handleNavClick("catalog");
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 w-full text-left"
                >
                  <span>📋</span>
                  <span>Catalogue</span>
                </button>
              ) : (
                <Link
                  to="/catalogue"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <span>📋</span>
                  <span>Catalogue</span>
                </Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <button
                  onClick={() => {
                    handleNavClick("products");
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 w-full text-left"
                >
                  <span>🎨</span>
                  <span>Products</span>
                </button>
              ) : (
                <Link
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <span>🎨</span>
                  <span>Products</span>
                </Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <button
                  onClick={() => {
                    handleNavClick("about");
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 w-full text-left"
                >
                  <span>🏢</span>
                  <span>About</span>
                </button>
              ) : (
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <span>🏢</span>
                  <span>About</span>
                </Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <button
                  onClick={() => {
                    handleNavClick("contact");
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 w-full text-left"
                >
                  <span>📞</span>
                  <span>Contact</span>
                </button>
              ) : (
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <span>📞</span>
                  <span>Contact</span>
                </Link>
              )}
            </li>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                to="/search"
                className="btn-primary w-full py-3 font-semibold flex items-center justify-center space-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <span>🔍</span>
                <span>Search Products</span>
              </Link>

              <Link
                to="/admin"
                className="glass w-full py-3 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <span>⚙️</span>
                <span>Admin Panel</span>
              </Link>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
