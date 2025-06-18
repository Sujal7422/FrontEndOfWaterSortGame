import React from 'react'
import { Link , NavLink } from 'react-router-dom'

function Header() {
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
    {['Home', 'Dashboard', 'About'].map((item, i) => (
      <div
        key={item}
        className="px-4 py-2 font-semibold rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-110"
        style={{
          backgroundColor: 'rgb(50,110,180)',
          color: 'rgb(240,240,255)',
          boxShadow: '0 0 10px rgb(45,160,220)',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgb(240,240,255)';
          e.target.style.color = 'rgb(72,52,155)';
          e.target.style.boxShadow = '0 0 15px rgb(72,52,155)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgb(50,110,180)';
          e.target.style.color = 'rgb(240,240,255)';
          e.target.style.boxShadow = '0 0 10px rgb(45,160,220)';
        }}
      >
        {item}
      </div>
    ))}
  </div>
</div>

  )
}

export default Header
