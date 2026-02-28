import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useStore } from '../store/useStore';

const Login = () => {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const loginWithGoogle = useStore((state) => state.loginWithGoogle);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="w-full max-w-md p-8 bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-white font-display">Log in to your account</h2>
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#7A8499] mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute top-2 left-2 w-4 h-4 text-[#7A8499]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-8 pr-3 py-2 bg-bg-2 rounded-lg text-white placeholder-[#7A8499] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#7A8499] mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute top-2 left-2 w-4 h-4 text-[#7A8499]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-8 pr-3 py-2 bg-bg-2 rounded-lg text-white placeholder-[#7A8499] focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 font-medium text-black transition-colors bg-gold rounded-xl hover:bg-gold-light"
          >
            Log In
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-600" />
          <span className="mx-2 text-sm text-[#7A8499]">or</span>
          <hr className="flex-1 border-gray-600" />
        </div>
        <button
          onClick={handleGoogle}
          className="w-full py-2 flex items-center justify-center space-x-2 border border-[rgba(212,168,67,0.35)] rounded-xl hover:bg-[rgba(212,168,67,0.1)] transition-all"
        >
          <LogIn className="w-5 h-5" />
          <span className="text-sm text-white">Continue with Google</span>
        </button>
        <p className="mt-4 text-center text-sm text-[#7A8499]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-gold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
