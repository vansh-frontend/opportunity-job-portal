import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import CompanyCard from '../components/CompanyCard';
import { COMPANIES } from '../data/companies';

const Companies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = searchQuery.length > 0
    ? COMPANIES.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : COMPANIES;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg grid-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="font-display font-bold text-4xl mb-4">
              Explore <span className="text-gold">Companies</span>
            </h1>
            <p className="text-[#7A8499] text-lg mb-6">
              Discover companies and their open positions
            </p>

            <div className="flex items-center space-x-3 max-w-2xl bg-surface border border-[rgba(212,168,67,0.35)] rounded-xl p-3">
              <Search className="w-5 h-5 text-[#7A8499] ml-2" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#7A8499]"
              />
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
            {filteredCompanies.map((company) => (
              <motion.div
                key={company.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <CompanyCard
                  company={company}
                  onClick={() => navigate(`/companies/${company.id}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Companies;
