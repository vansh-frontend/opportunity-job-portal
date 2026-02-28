import { motion } from 'framer-motion';
import { Calendar, Users, Trophy } from 'lucide-react';
import { differenceInDays } from 'date-fns';

const OpportunityCard = ({ opportunity, onClick }) => {
  const daysLeft = differenceInDays(new Date(opportunity.deadline), new Date());

  const getTypeColor = (type) => {
    const colors = {
      'Hackathon': 'from-purple-500 to-purple-700',
      'Scholarship': 'from-green-500 to-green-700',
      'GSoC': 'from-blue-500 to-blue-700',
      'Exchange': 'from-orange-500 to-orange-700',
      'Internship': 'from-teal-500 to-teal-700'
    };
    return colors[type] || 'from-gold to-gold-light';
  };

  const getUrgencyColor = (days) => {
    if (days < 3) return 'text-red-400';
    if (days < 7) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-surface border border-[rgba(212,168,67,0.12)] hover:border-[rgba(212,168,67,0.35)] rounded-2xl p-6 cursor-pointer transition-all hover:shadow-card"
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(opportunity.type)}`}>
          {opportunity.type}
        </span>
        <span className={`text-sm font-bold ${getUrgencyColor(daysLeft)}`}>
          {daysLeft} days left
        </span>
      </div>

      <h3 className="font-display font-bold text-xl text-white mb-2 hover:text-gold transition-colors">
        {opportunity.title}
      </h3>

      <p className="text-[#7A8499] text-sm mb-4">{opportunity.org}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-gold" />
          <span className="text-sm text-white">{opportunity.prize}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gold" />
          <span className="text-sm text-white">{opportunity.teamSize}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gold" />
          <span className="text-sm text-white">{daysLeft}d</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-[#7A8499] mb-2">
          <span>Spots Filled</span>
          <span>{opportunity.spotsFilledPct}%</span>
        </div>
        <div className="w-full h-2 bg-bg-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${opportunity.spotsFilledPct}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-gold to-gold-light"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {opportunity.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-surface-2 text-[#7A8499] rounded-md text-xs font-mono-custom"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default OpportunityCard;
