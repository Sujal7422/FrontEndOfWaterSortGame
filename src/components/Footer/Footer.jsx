import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Adjust path if needed

function Footer() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <footer
      className="w-full mt-20 px-6 py-8 text-center text-[rgb(240,240,255)]"
      style={{
        background: 'linear-gradient(90deg, rgb(72,52,155) 0%, rgb(50,110,180) 100%)',
        boxShadow: '0 -4px 20px rgba(50,110,180,0.4)',
        borderTop: '3px solid rgb(180,180,210)',
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">

        {/* Left: Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-lg">
          <div
            className="text-2xl font-bold mb-1 px-4 py-2 rounded-lg shadow-md"
            style={{
              backgroundColor: 'rgb(180,180,210)',
              color: 'rgb(72,52,155)',
              boxShadow: '0 0 10px rgb(50,110,180)',
            }}
          >
            🎮 GameZone
          </div>
          <p className="text-sm text-[rgb(210,210,230)]">
            A place where every puzzle has a purpose.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex gap-6 text-[rgb(240,240,255)] font-semibold">
          <Link
            to="/about"
            className="hover:text-[rgb(72,52,155)] transition duration-300"
          >
            About
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-[rgb(72,52,155)] transition duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-[rgb(72,52,155)] transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4 text-xl">
          {['🌐', '🐦', '📸'].map((icon, idx) => (
            <span
              key={idx}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgb(180,180,210)] text-[rgb(72,52,155)] shadow hover:scale-110 transition-transform cursor-pointer"
              style={{ boxShadow: '0 0 8px rgb(50,110,180)' }}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-8 text-sm text-[rgb(200,200,220)]">
        © {new Date().getFullYear()} GameZone. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
