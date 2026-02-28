import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Briefcase } from 'lucide-react';
import { JOBS } from '../data/jobs';

const CompanyCard = ({ company, onClick }) => {
  const openPositions = JOBS.filter(job => job.company === company.name).length;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-surface border border-[rgba(212,168,67,0.12)] hover:border-[rgba(212,168,67,0.35)] rounded-2xl p-6 cursor-pointer transition-all hover:shadow-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-bold text-2xl`}>
          {company.logo}
        </div>
        {company.verified && (
          <CheckCircle className="w-5 h-5 text-gold fill-gold" />
        )}
      </div>

      <h3 className="font-display font-bold text-xl text-white mb-2 hover:text-gold transition-colors">
        {company.name}
      </h3>

      <p className="text-[#7A8499] text-sm mb-4 line-clamp-2">
        {company.tagline}
      </p>

      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center space-x-2 text-gold">
          <Briefcase className="w-4 h-4" />
          <span className="font-medium">{openPositions} open positions</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-[#7A8499] text-xs">
        <MapPin className="w-3 h-3" />
        <span>{company.location}</span>
      </div>
    </motion.div>
  );
};

export default CompanyCard;
