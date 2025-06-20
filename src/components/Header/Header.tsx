import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className="flex w-full justify-between items-center text-2xl md:text-3xl px-6 py-4 sticky top-0 z-50 shadow-lg backdrop-blur-md"
      style={{
        background: 'linear-gradient(90deg, rgb(180,180,210) 0%, rgb(72,52,155) 100%)',
        borderBottom: '3px solid rgb(50,110,180)',
      }}
    >
      {/* Left: Logo and Game Name */}
      <div className="flex items-center gap-4">
        <div
          className="px-4 py-2 font-bold rounded-xl shadow-md transition-transform transform hover:scale-105"
          style={{
            backgroundColor: 'rgb(50,110,180)',
            color: 'rgb(240,240,255)',
            boxShadow: '0 0 10px rgb(50,110,180)',
          }}
        >
          🔮 LOGO
        </div>
        <div
          className="px-6 py-2 font-bold rounded-xl shadow-md transition-transform transform hover:scale-105"
          style={{
            backgroundColor: 'rgb(50,110,180)',
            color: 'rgb(240,240,255)',
            boxShadow: '0 0 15px rgb(50,110,180)',
          }}
        >
          🎮 Game Name
        </div>
      </div>

      {/* Right: Navigation Links */}
      <div className="flex items-center gap-6 md:gap-20">
        {isLoggedIn && (
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        )}

        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>

        {!isLoggedIn ? (
          <>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={navLinkClass}>
              Register
            </NavLink>
          </>
        ) : (
          <button onClick={handleLogout} className={navLinkClass}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

// 🧠 Conditional class based on route match
const navLinkClass = ({ isActive }) =>
  `px-4 py-2 font-semibold rounded-lg transition-all duration-300 transform hover:scale-110 ${
    isActive
      ? 'bg-[rgb(240,240,255)] text-[rgb(72,52,155)] shadow-[0_0_15px_rgb(72,52,155)]'
      : 'bg-[rgb(50,110,180)] text-[rgb(240,240,255)] shadow-[0_0_10px_rgb(45,160,220)] hover:bg-[rgb(240,240,255)] hover:text-[rgb(72,52,155)] hover:shadow-[0_0_15px_rgb(72,52,155)]'
  }`;

export default Header;
