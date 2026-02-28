import { motion } from 'framer-motion';
import { MapPin, Briefcase, Users, Calendar, CheckCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';
import { COMPANIES } from '../data/companies';

const JobDetail = ({ job }) => {
  const { appliedJobs, savedJobs, applyToJob, toggleSaveJob } = useStore();

  const isApplied = appliedJobs.has(job.id);
  const isSaved = savedJobs.has(job.id);

  const company = COMPANIES.find(c => c.name === job.company);

  const handleApply = () => {
    if (!isApplied) {
      applyToJob(job.id);
    }
  };

  const handleSave = () => {
    toggleSaveJob(job.id);
  };

  return (
    <motion.div
      key={job.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full overflow-y-auto"
    >
      <div className="p-6 border-b border-[rgba(212,168,67,0.12)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${company?.color || 'from-gold to-gold-light'} flex items-center justify-center text-white font-bold text-2xl`}>
              {company?.logo || job.company[0]}
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl text-white mb-1">
                {job.title}
              </h2>
              <p className="text-[#7A8499] flex items-center">
                {job.company}
                {company?.verified && (
                  <CheckCircle className="w-4 h-4 ml-2 text-gold fill-gold" />
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-bg-2 rounded-xl p-3">
            <div className="text-[#7A8499] text-xs mb-1">Salary</div>
            <div className="text-gold font-bold">₹{job.salary}</div>
            <div className="text-[#7A8499] text-xs">{job.salaryPeriod}</div>
          </div>
          <div className="bg-bg-2 rounded-xl p-3">
            <div className="text-[#7A8499] text-xs mb-1">Type</div>
            <div className="text-white font-medium">{job.type}</div>
            <div className="text-[#7A8499] text-xs">{job.mode}</div>
          </div>
          <div className="bg-bg-2 rounded-xl p-3">
            <div className="text-[#7A8499] text-xs mb-1">Applicants</div>
            <div className="text-white font-medium">{job.applicants}</div>
            <div className="text-[#7A8499] text-xs">{job.postedAgo}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleApply}
            disabled={isApplied}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              isApplied
                ? 'bg-green-500/10 border border-green-500/30 text-green-400 cursor-default'
                : 'bg-gold text-black hover:bg-gold-light hover:shadow-gold'
            }`}
          >
            {isApplied ? '✓ Applied' : 'Apply Now'}
          </motion.button>
          <button
            onClick={handleSave}
            className="px-4 py-3 border border-[rgba(212,168,67,0.35)] text-gold rounded-xl hover:bg-[rgba(212,168,67,0.1)] transition-all"
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 fill-gold text-gold" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="font-display font-bold text-lg mb-3">About the Role</h3>
          <div className="text-[#7A8499] text-sm space-y-3 leading-relaxed">
            {job.description.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-lg mb-3">Requirements</h3>
          <ul className="space-y-2">
            {job.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start text-[#7A8499] text-sm">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-gold flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-lg mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-surface-2 border border-[rgba(212,168,67,0.12)] text-white rounded-lg text-sm font-mono-custom"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-lg mb-3">Perks & Benefits</h3>
          <div className="grid grid-cols-2 gap-3">
            {job.perks.map((perk) => (
              <div
                key={perk}
                className="flex items-center space-x-2 bg-bg-2 rounded-lg p-3"
              >
                <CheckCircle className="w-4 h-4 text-gold" />
                <span className="text-sm text-[#7A8499]">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {job.deadline && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-red-400">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">
                Application Deadline: {format(new Date(job.deadline), 'MMMM d, yyyy')}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JobDetail;
