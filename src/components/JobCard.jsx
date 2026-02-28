import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Bookmark, BookmarkCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { COMPANIES } from '../data/companies';

const JobCard = ({ job, onClick, isActive = false }) => {
  const { appliedJobs, savedJobs, applyToJob, toggleSaveJob } = useStore();

  const isApplied = appliedJobs.has(job.id);
  const isSaved = savedJobs.has(job.id);

  const company = COMPANIES.find(c => c.name === job.company);

  const handleApply = (e) => {
    e.stopPropagation();
    if (!isApplied) {
      applyToJob(job.id);
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSaveJob(job.id);
  };

  const getBadgeStyle = (badge) => {
    const styles = {
      'Remote': 'bg-green-500/10 border-green-500/30 text-green-400',
      'Urgent': 'bg-red-500/10 border-red-500/30 text-red-400',
      'New': 'bg-gold/10 border-gold/30 text-gold',
      'Hybrid': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      'Intern': 'bg-purple-500/10 border-purple-500/30 text-purple-400'
    };
    return styles[badge] || 'bg-gold/10 border-gold/30 text-gold';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`bg-surface border rounded-2xl p-5 cursor-pointer transition-all hover:shadow-card ${
        isActive
          ? 'border-gold border-l-2 border-l-gold'
          : 'border-[rgba(212,168,67,0.12)] hover:border-[rgba(212,168,67,0.35)]'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${company?.color || 'from-gold to-gold-light'} flex items-center justify-center text-white font-bold text-xl`}>
            {company?.logo || job.company[0]}
          </div>
          <div>
            <h3 className="font-semibold text-white hover:text-gold transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-[#7A8499]">{job.company}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="text-[#7A8499] hover:text-gold transition-colors"
        >
          {isSaved ? (
            <BookmarkCheck className="w-5 h-5 fill-gold text-gold" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="flex items-center space-x-4 text-xs text-[#7A8499] mb-3">
        <span className="flex items-center">
          <MapPin className="w-3 h-3 mr-1" />
          {job.location}
        </span>
        <span>{job.mode}</span>
        <span>{job.type}</span>
      </div>

      <div className="flex items-center space-x-4 text-xs text-[#7A8499] mb-4">
        <span className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {job.postedAgo}
        </span>
        <span className="flex items-center">
          <Users className="w-3 h-3 mr-1" />
          {job.applicants} applicants
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.badges?.map((badge) => (
          <span
            key={badge}
            className={`px-2 py-1 rounded-md text-xs font-medium border ${getBadgeStyle(badge)}`}
          >
            {badge}
          </span>
        ))}
        {job.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-surface-2 text-[#7A8499] rounded-md text-xs font-mono-custom"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[rgba(212,168,67,0.12)]">
        <div>
          <span className="text-gold font-bold text-lg">₹{job.salary}</span>
          <span className="text-[#7A8499] text-xs ml-1">{job.salaryPeriod}</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleApply}
          disabled={isApplied}
          className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
            isApplied
              ? 'bg-green-500/10 border border-green-500/30 text-green-400 cursor-default'
              : 'bg-gold text-black hover:bg-gold-light hover:shadow-gold'
          }`}
        >
          {isApplied ? '✓ Applied' : 'Quick Apply'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobCard;
