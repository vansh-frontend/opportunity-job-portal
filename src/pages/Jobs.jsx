import { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import FilterSidebar from '../components/FilterSidebar';
import JobCard from '../components/JobCard';
import JobDetail from '../components/JobDetail';
import { useStore } from '../store/useStore';
import { JOBS } from '../data/jobs';

const Jobs = () => {
  const { selectedJobId, setSelectedJob, getFilteredJobs } = useStore();
  const [sortBy, setSortBy] = useState('recent');

  const filteredJobs = getFilteredJobs();
  const selectedJob = JOBS.find(job => job.id === selectedJobId);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg grid-bg pt-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
            <div className="col-span-12 lg:col-span-3 overflow-y-auto">
              <div className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6 sticky top-0">
                <FilterSidebar />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 overflow-y-auto">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="font-display font-bold text-3xl mb-2">
                    Explore <span className="text-gold">Opportunities</span>
                  </h1>
                  <p className="text-[#7A8499]">
                    {filteredJobs.length} jobs found
                  </p>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-surface border border-[rgba(212,168,67,0.35)] rounded-xl text-sm text-white focus:outline-none focus:border-gold"
                >
                  <option value="recent">Most Recent</option>
                  <option value="salary">Highest Salary</option>
                  <option value="applicants">Least Applicants</option>
                </select>
              </div>

              <motion.div
                className="space-y-4 pb-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <JobCard
                      job={job}
                      onClick={() => setSelectedJob(job.id)}
                      isActive={job.id === selectedJobId}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex items-center justify-center space-x-2 py-8">
                <button className="w-10 h-10 border border-[rgba(212,168,67,0.35)] rounded-lg text-gold hover:bg-[rgba(212,168,67,0.1)] transition-colors">
                  1
                </button>
                {[2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className="w-10 h-10 border border-[rgba(212,168,67,0.12)] rounded-lg text-[#7A8499] hover:border-gold hover:text-gold transition-colors"
                  >
                    {page}
                  </button>
                ))}
                <span className="text-[#7A8499]">...</span>
                <button className="w-10 h-10 border border-[rgba(212,168,67,0.12)] rounded-lg text-[#7A8499] hover:border-gold hover:text-gold transition-colors">
                  24
                </button>
              </div>
            </div>

            <div className="hidden lg:block col-span-4 overflow-hidden">
              <div className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl h-full overflow-hidden sticky top-0">
                {selectedJob ? (
                  <JobDetail job={selectedJob} />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#7A8499]">
                    Select a job to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Jobs;
