import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Explore: [
      { label: 'Jobs', to: '/jobs' },
      { label: 'Internships', to: '/opportunities' },
      { label: 'Hackathons', to: '/opportunities' },
      { label: 'Companies', to: '/companies' }
    ],
    Students: [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Profile', to: '/profile' },
      { label: 'Resources', to: '/resources' },
      { label: 'Career Guide', to: '/resources' }
    ],
    Employers: [
      { label: 'Post a Job', to: '/jobs' },
      { label: 'Pricing', to: '/jobs' },
      { label: 'Success Stories', to: '/' },
      { label: 'Hire Talent', to: '/companies' }
    ],
    Company: [
      { label: 'About Us', to: '/' },
      { label: 'Contact', to: '/' },
      { label: 'Privacy Policy', to: '/' },
      { label: 'Terms of Service', to: '/' }
    ]
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <footer className="bg-bg-2 border-t-2 border-[rgba(212,168,67,0.12)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
                <span className="text-black font-display font-bold text-lg">O</span>
              </div>
              <span className="font-display font-bold text-xl">
                Opport<span className="text-gold">UNITY</span>
              </span>
            </Link>
            <p className="text-[#7A8499] text-sm mb-4">
              Every opportunity, in one place.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-surface border border-[rgba(212,168,67,0.12)] hover:border-gold flex items-center justify-center text-[#7A8499] hover:text-gold transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display font-semibold text-sm mb-4 text-gold">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[#7A8499] text-sm hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[rgba(212,168,67,0.12)] flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[#7A8499] text-sm">
            © {currentYear} OpportUNITY. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-[#7A8499] text-sm hover:text-gold transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/"
              className="text-[#7A8499] text-sm hover:text-gold transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/"
              className="text-[#7A8499] text-sm hover:text-gold transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
