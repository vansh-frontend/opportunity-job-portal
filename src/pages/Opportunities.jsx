import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import OpportunityCard from '../components/OpportunityCard';
import { OPPORTUNITIES } from '../data/opportunities';

const Opportunities = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Internships', 'Hackathons', 'Scholarships', 'Exchange Programs'];

  const filteredOpportunities = activeTab === 'All'
    ? OPPORTUNITIES
    : OPPORTUNITIES.filter(opp => {
        if (activeTab === 'Internships') return opp.type === 'Internship';
        if (activeTab === 'Hackathons') return opp.type === 'Hackathon';
        if (activeTab === 'Scholarships') return opp.type === 'Scholarship';
        if (activeTab === 'Exchange Programs') return opp.type === 'Exchange';
        return true;
      });

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg grid-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="font-display font-bold text-4xl mb-4">
              Discover <span className="text-gold">Opportunities</span>
            </h1>
            <p className="text-[#7A8499] text-lg">
              Find internships, hackathons, scholarships, and exchange programs
            </p>
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
            {filteredOpportunities.map((opp) => (
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
      </div>
    </PageWrapper>
  );
};

export default Opportunities;
