import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { JOBS } from '../data/jobs';

const SearchModal = () => {
  const { isSearchModalOpen, toggleSearchModal, setSelectedJob } = useStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredJobs = query.length > 0
    ? JOBS.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearchModal();
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        toggleSearchModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, toggleSearchModal]);

  const handleJobClick = (jobId) => {
    setSelectedJob(jobId);
    navigate('/jobs');
    toggleSearchModal();
    setQuery('');
  };

  if (!isSearchModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
        onClick={toggleSearchModal}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-surface border border-[rgba(212,168,67,0.35)] rounded-2xl shadow-card max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center border-b border-[rgba(212,168,67,0.12)] p-4">
            <Search className="w-5 h-5 text-[#7A8499] mr-3" />
            <input
              type="text"
              placeholder="Search jobs, companies, skills..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#7A8499]"
              autoFocus
            />
            <button
              onClick={toggleSearchModal}
              className="text-[#7A8499] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {query.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {filteredJobs.length > 0 ? (
                <div className="p-2">
                  {filteredJobs.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => handleJobClick(job.id)}
                      className="w-full text-left p-4 rounded-xl hover:bg-surface-2 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white group-hover:text-gold transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm text-[#7A8499] mt-1">
                            {job.company} · {job.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gold">{job.salary}</span>
                          <p className="text-xs text-[#7A8499] mt-1">{job.salaryPeriod}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-[#7A8499]">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}

          {query.length === 0 && (
            <div className="p-8 text-center text-[#7A8499]">
              <p className="text-sm">Start typing to search jobs...</p>
              <p className="text-xs mt-2">
                Press <kbd className="px-2 py-1 bg-surface-2 rounded text-gold">⌘K</kbd> to open
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
