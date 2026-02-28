import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, LogIn } from 'lucide-react';
import { useStore } from '../store/useStore';

const Signup = () => {
  const navigate = useNavigate();
  const signup = useStore((state) => state.signup);
  const loginWithGoogle = useStore((state) => state.loginWithGoogle);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState(null);

  const validatePhone = (value) => {
    // allow optional +countrycode followed by 10 digits
    return /^\+?\d{10,13}$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (phone && !validatePhone(phone)) {
      setError('Enter a valid phone number (country code + 10 digits)');
      return;
    }

    try {
      let photoURL = null;
      if (avatarFile) {
        // dynamic import to avoid loading helper everywhere
        const { uploadToImgbb } = await import('../utils/imgbb');
        photoURL = await uploadToImgbb(avatarFile);
      }
      await signup(email, password, name, phone, photoURL);
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
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-full max-w-md p-8 bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl">
        <h2 className="text-2xl font-display font-bold text-white mb-6 text-center">Create an account</h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#7A8499] mb-1">Profile photo (optional)</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setAvatarFile(file);
                  if (file) {
                    setAvatarPreview(URL.createObjectURL(file));
                  } else {
                    setAvatarPreview(null);
                  }
                }}
                className="w-full text-sm text-white"
              />
            </div>
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="preview"
                className="w-16 h-16 rounded-full mt-2 object-cover"
              />
            )}
          </div>
          <div>
            <label className="block text-sm text-[#7A8499] mb-1">Full name</label>
            <div className="relative">
              <User className="absolute top-2 left-2 w-4 h-4 text-[#7A8499]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-8 pr-3 py-2 bg-bg-2 rounded-lg text-white placeholder-[#7A8499] focus:outline-none"
              />
            </div>
          </div>
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
          <div>
            <label className="block text-sm text-[#7A8499] mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute top-2 left-2 w-4 h-4 text-[#7A8499]" />
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full pl-8 pr-3 py-2 bg-bg-2 rounded-lg text-white placeholder-[#7A8499] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#7A8499] mb-1">Phone (optional)</label>
            <div className="relative">
              <Phone className="absolute top-2 left-2 w-4 h-4 text-[#7A8499]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+919876543210"
                className="w-full pl-8 pr-3 py-2 bg-bg-2 rounded-lg text-white placeholder-[#7A8499] focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gold text-black rounded-xl font-medium hover:bg-gold-light transition-colors"
          >
            Sign Up
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
          Already have an account?{' '}
          <Link to="/login" className="text-gold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
