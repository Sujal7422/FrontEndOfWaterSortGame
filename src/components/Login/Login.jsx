import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginResult = await login({ Email, Password });

      if (!loginResult?.success) {
        alert(loginResult?.message || "Login failed");
        return;
      }

      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(42,30,68)]">
      <div className="w-[470px] relative scale-90 hover:scale-100 transition-all duration-500">
        <div className="absolute top-6 left-6 w-full h-full border-[3px] border-[rgb(50,110,180)] rounded-lg z-0"></div>
        <div className="absolute top-12 left-12 w-full h-full border border-[rgb(50,110,180)] rounded-lg z-0"></div>

        <div className="relative z-10 border-4 border-[rgb(50,110,180)] bg-[rgb(72,52,155)] rounded-lg overflow-hidden text-[rgb(240,240,255)]">
          <div className="flex items-center justify-between px-4 py-2 bg-[rgb(50,110,180)] text-[rgb(72,52,155)]">
            <span className="text-xl font-bold">Login</span>
            <div className="w-4 h-4 rounded-full bg-[rgb(72,52,155)] hover:bg-white transition-all duration-500"></div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 px-8 py-6">
            <div>
              <label className="block text-lg mb-1 text-[rgb(180,180,210)]">EMAIL:</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-xl px-4 py-2 rounded-md bg-[rgb(42,30,68)] border-2 border-[rgb(50,110,180)] placeholder:text-gray-400 focus:border-white outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-lg mb-1 text-[rgb(180,180,210)]">PASSWORD:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xl px-4 py-2 rounded-md bg-[rgb(42,30,68)] border-2 border-[rgb(50,110,180)] placeholder:text-gray-400 focus:border-white outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 text-xl font-bold py-3 rounded-md bg-[rgb(50,110,180)] text-[rgb(240,240,255)] border-2 border-[rgb(50,110,180)] hover:bg-white hover:text-[rgb(72,52,155)] hover:border-[rgb(72,52,155)] transition-all"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
