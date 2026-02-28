import { Link, useLocation } from 'react-router-dom';
import { Bell, PlusCircle, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';
// remove mock import; user will come from store

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { notifications, markAllRead, toggleSearchModal, user, logout } = useStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { to: '/jobs', label: 'Explore Jobs' },
    { to: '/opportunities', label: 'Internships' },
    { to: '/opportunities', label: 'Competitions' },
    { to: '/companies', label: 'Companies' },
    { to: '/resources', label: 'Resources' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-[rgba(212,168,67,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
                <span className="text-black font-display font-bold text-lg">O</span>
              </div>
              <span className="font-display font-bold text-xl">
                Opport<span className="text-gold">UNITY</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link, idx) => (
                <Link
                  key={`${link.to}-${link.label}-${idx}`}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-gold'
                      : 'text-[#7A8499] hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {!user ? (
                <>
                  <Link to="/login" className="text-sm font-medium text-[#7A8499] hover:text-gold">
                    Log in
                  </Link>
                  <Link to="/signup">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-[rgba(212,168,67,0.35)] text-gold rounded-xl hover:bg-[rgba(212,168,67,0.1)] transition-all">
                      <PlusCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign up</span>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={toggleSearchModal}
                    className="p-2 rounded-lg hover:bg-surface transition-colors text-[#7A8499] hover:text-gold"
                  >
                    <Search className="w-5 h-5" />
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => markAllRead()}
                      className="p-2 rounded-lg hover:bg-surface transition-colors text-[#7A8499] hover:text-gold relative"
                    >
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full"></span>
                      )}
                    </button>
                  </div>

                  <Link to="/jobs">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-[rgba(212,168,67,0.35)] text-gold rounded-xl hover:bg-[rgba(212,168,67,0.1)] transition-all">
                      <PlusCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Post Opportunity</span>
                    </button>
                  </Link>

                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                      {user?.photoURL ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover rounded-full" /> : (user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U')}
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-surface border border-[rgba(212,168,67,0.12)] rounded-xl shadow-card overflow-hidden">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-3 text-sm hover:bg-surface-2 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="block px-4 py-3 text-sm hover:bg-surface-2 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-surface-2 transition-colors border-t border-[rgba(212,168,67,0.12)]"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 text-[#7A8499]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-bg pt-16">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-[rgba(212,168,67,0.1)] text-gold'
                    : 'text-[#7A8499] hover:bg-surface'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 rounded-xl text-sm font-medium text-[#7A8499] hover:bg-surface transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 text-sm font-medium text-gold border border-[rgba(212,168,67,0.35)] rounded-xl hover:bg-[rgba(212,168,67,0.1)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-3 rounded-xl text-sm font-medium text-[#7A8499] hover:bg-surface transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="px-4 py-3 rounded-xl text-sm font-medium text-[#7A8499] hover:bg-surface transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
