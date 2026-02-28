import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, BookOpen } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Resume Tips', 'Interview Prep', 'Skill Building', 'Career Guidance'];

  const resources = [
    {
      id: 1,
      title: 'How to Write a Winning Resume',
      category: 'Resume Tips',
      readTime: '5 min',
      excerpt: 'Learn the essential elements of a compelling resume that catches recruiters attention.',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 2,
      title: 'Mastering Technical Interviews',
      category: 'Interview Prep',
      readTime: '10 min',
      excerpt: 'A comprehensive guide to ace your technical interviews with confidence.',
      color: 'from-green-500 to-green-700'
    },
    {
      id: 3,
      title: 'Building a Strong Portfolio',
      category: 'Skill Building',
      readTime: '7 min',
      excerpt: 'Tips for creating a portfolio that showcases your best work effectively.',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 4,
      title: 'Networking Tips for Students',
      category: 'Career Guidance',
      readTime: '6 min',
      excerpt: 'How to build meaningful professional connections that advance your career.',
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 5,
      title: 'Common Interview Mistakes to Avoid',
      category: 'Interview Prep',
      readTime: '5 min',
      excerpt: 'Learn about the most common pitfalls in interviews and how to avoid them.',
      color: 'from-red-500 to-red-700'
    },
    {
      id: 6,
      title: 'Learning Modern Web Development',
      category: 'Skill Building',
      readTime: '15 min',
      excerpt: 'A roadmap for learning web development from scratch to advanced concepts.',
      color: 'from-teal-500 to-teal-700'
    },
    {
      id: 7,
      title: 'Negotiating Your First Salary',
      category: 'Career Guidance',
      readTime: '8 min',
      excerpt: 'Essential tips for negotiating a competitive salary for your first job.',
      color: 'from-gold to-gold-light'
    },
    {
      id: 8,
      title: 'ATS-Friendly Resume Guide',
      category: 'Resume Tips',
      readTime: '6 min',
      excerpt: 'How to optimize your resume to pass through applicant tracking systems.',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 9,
      title: 'Behavioral Interview Questions',
      category: 'Interview Prep',
      readTime: '12 min',
      excerpt: 'Master the STAR method and ace behavioral interview questions.',
      color: 'from-green-500 to-green-700'
    }
  ];

  const topPicks = resources.slice(0, 3);

  const filteredResources = activeTab === 'All'
    ? resources
    : resources.filter(r => r.category === activeTab);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg grid-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="font-display font-bold text-4xl mb-4">
              Career <span className="text-gold">Resources</span>
            </h1>
            <p className="text-[#7A8499] text-lg mb-6">
              Guides, tips, and resources to help you succeed in your career journey
            </p>

            <div className="flex items-center space-x-3 max-w-2xl bg-surface border border-[rgba(212,168,67,0.35)] rounded-xl p-3">
              <Search className="w-5 h-5 text-[#7A8499] ml-2" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#7A8499]"
              />
            </div>
          </div>

          <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-gold text-black'
                    : 'bg-surface border border-[rgba(212,168,67,0.12)] text-[#7A8499] hover:border-gold hover:text-gold'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="font-display font-bold text-2xl mb-6">
              Top <span className="text-gold">Picks</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topPicks.map((resource) => (
                <motion.div
                  key={resource.id}
                  whileHover={{ y: -4 }}
                  className="bg-surface border border-[rgba(212,168,67,0.12)] hover:border-[rgba(212,168,67,0.35)] rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-card"
                >
                  <div className={`h-32 bg-gradient-to-r ${resource.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold rounded-lg text-xs font-medium">
                        {resource.category}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-[#7A8499]">
                        <Clock className="w-3 h-3" />
                        <span>{resource.readTime}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 hover:text-gold transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-[#7A8499]">{resource.excerpt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl mb-6">
              All <span className="text-gold">Resources</span>
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
            >
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -4 }}
                  className="bg-surface border border-[rgba(212,168,67,0.12)] hover:border-[rgba(212,168,67,0.35)] rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-card"
                >
                  <div className={`h-24 bg-gradient-to-r ${resource.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-surface-2 text-[#7A8499] rounded-md text-xs font-mono-custom">
                        {resource.category}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-[#7A8499]">
                        <Clock className="w-3 h-3" />
                        <span>{resource.readTime}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 hover:text-gold transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-[#7A8499] line-clamp-2">{resource.excerpt}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Resources;
