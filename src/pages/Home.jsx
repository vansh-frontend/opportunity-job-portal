import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Target, Zap, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import OpportunityCard from '../components/OpportunityCard';
import { OPPORTUNITIES } from '../data/opportunities';
import { COMPANIES } from '../data/companies';

const Home = () => {
  const navigate = useNavigate();
  const [searchRole, setSearchRole] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = () => {
    navigate(`/jobs?role=${searchRole}&location=${searchLocation}`);
  };

  const stats = [
    { label: 'Opportunities', value: '48K+' },
    { label: 'Companies', value: '3.2K' },
    { label: 'Placement Rate', value: '92%' },
    { label: 'Students', value: '1.8L' }
  ];

  const features = [
    {
      icon: Target,
      title: 'Centralized Listings',
      description: 'Find all opportunities in one place - jobs, internships, hackathons, scholarships, and more.'
    },
    {
      icon: Zap,
      title: 'One-click Apply',
      description: 'Apply to multiple opportunities instantly with your saved profile and resume.'
    },
    {
      icon: TrendingUp,
      title: 'Track Applications',
      description: 'Monitor your applications, interviews, and offers all in one dashboard.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'SDE at Google',
      college: 'IIT Delhi',
      quote: 'OpportUNITY helped me land my dream job at Google. The platform made it so easy to discover and apply to opportunities!'
    },
    {
      name: 'Rahul Verma',
      role: 'Product Designer at Zomato',
      college: 'NIT Trichy',
      quote: 'I found my internship and eventually a full-time role through OpportUNITY. Highly recommend to all students!'
    },
    {
      name: 'Ananya Gupta',
      role: 'Data Scientist at Flipkart',
      college: 'BITS Pilani',
      quote: 'The dashboard feature is amazing. I could track all my applications and never missed a deadline!'
    }
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg">
        <div
          className="grid-bg relative"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 60%)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center space-x-2 bg-surface border border-[rgba(212,168,67,0.35)] rounded-full px-4 py-2 mb-8"
              >
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                <span className="text-sm text-[#7A8499]">
                  1,240 new opportunities this week
                </span>
              </motion.div>

              <motion.h1
                className="font-display font-extrabold text-5xl md:text-7xl mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Find Your Dream{' '}
                <span className="text-gold">Opportunity</span>
                <br />
                All in One Place
              </motion.h1>

              <motion.p
                className="text-xl text-[#7A8499] max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Discover internships, jobs, hackathons, and scholarships tailored for students like you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 max-w-3xl mx-auto bg-surface border border-[rgba(212,168,67,0.35)] rounded-2xl p-3"
              >
                <div className="flex items-center flex-1 space-x-3 px-4">
                  <Search className="w-5 h-5 text-[#7A8499]" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#7A8499]"
                  />
                </div>
                <div className="w-px h-8 bg-[rgba(212,168,67,0.12)]"></div>
                <div className="flex items-center flex-1 space-x-3 px-4">
                  <MapPin className="w-5 h-5 text-[#7A8499]" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#7A8499]"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-gold text-black font-bold px-8 py-3 rounded-xl hover:bg-gold-light transition-all hover:shadow-gold"
                >
                  Search
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-2 mt-6"
              >
                {['All', 'Remote', 'Internship', 'Full-time', 'Part-time', 'Fresher Friendly'].map((filter) => (
                  <Link
                    key={filter}
                    to="/jobs"
                    className="px-4 py-2 border border-[rgba(212,168,67,0.12)] text-[#7A8499] rounded-lg text-sm hover:border-gold hover:text-gold transition-all"
                  >
                    {filter}
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#7A8499]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Featured <span className="text-gold">Opportunities</span>
            </h2>
            <p className="text-[#7A8499]">Don't miss out on these amazing opportunities</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {OPPORTUNITIES.slice(0, 4).map((opp) => (
              <motion.div
                key={opp.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <OpportunityCard
                  opportunity={opp}
                  onClick={() => navigate(`/opportunities/${opp.id}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="bg-surface py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Why <span className="text-gold">OpportUNITY</span>?
              </h2>
              <p className="text-[#7A8499]">Everything you need to kickstart your career</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg border border-[rgba(212,168,67,0.12)] rounded-2xl p-8 hover:border-[rgba(212,168,67,0.35)] transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-[#7A8499]">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Top Companies <span className="text-gold">Hiring Now</span>
            </h2>
            <p className="text-[#7A8499]">Join thousands of students working at these companies</p>
          </div>

          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {COMPANIES.map((company) => (
              <Link
                key={company.id}
                to={`/companies/${company.id}`}
                className="flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`w-24 h-24 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-bold text-3xl cursor-pointer shadow-lg`}
                >
                  {company.logo}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-surface py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Success <span className="text-gold">Stories</span>
              </h2>
              <p className="text-[#7A8499]">Hear from students who found their dream opportunities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg border border-[rgba(212,168,67,0.12)] rounded-2xl p-6"
                >
                  <p className="text-[#7A8499] mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center text-black font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-[#7A8499]">{testimonial.role}</div>
                      <div className="text-xs text-[#7A8499]">{testimonial.college}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-r from-gold/10 to-gold-light/10 border border-gold/30 rounded-3xl p-12 text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Ready to find your <span className="text-gold">opportunity</span>?
            </h2>
            <p className="text-[#7A8499] mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already found their dream opportunities through OpportUNITY
            </p>
            <Link to="/jobs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold text-black font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-all hover:shadow-gold inline-flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
