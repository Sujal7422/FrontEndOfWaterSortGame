import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Register() {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Use register and login from AuthContext
  const { register, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Register user using context function
      const registerResult = await register(Username, Email, Password);

      if (!registerResult.success) {
        alert(registerResult.message);
        setLoading(false);
        return;
      }

      // After successful registration, log in user automatically
      const loginResult = await login(Email, Password);

      if (!loginResult.success) {
        alert(loginResult.message);
        setLoading(false);
        return;
      }

      alert('User registered and logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred');
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
            <span className="text-xl font-bold">Register</span>
            <div className="w-4 h-4 rounded-full bg-[rgb(72,52,155)] hover:bg-white transition-all duration-500"></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8 py-6">
            <div>
              <label className="block text-lg mb-1 text-[rgb(180,180,210)]">NAME:</label>
              <input
                type="text"
                placeholder="user name"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full text-xl px-4 py-2 rounded-md bg-[rgb(42,30,68)] border-2 border-[rgb(50,110,180)] placeholder:text-gray-400 focus:border-white outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-lg mb-1 text-[rgb(180,180,210)]">EMAIL:</label>
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password"
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
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
