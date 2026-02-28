import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import JobDetail from '../components/JobDetail';
import JobCard from '../components/JobCard';
import { JOBS } from '../data/jobs';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = JOBS.find(j => j.id === parseInt(id));

  if (!job) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-bg grid-bg pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-white mb-4">Job Not Found</h1>
            <Link to="/jobs" className="text-gold hover:text-gold-light">
              Browse all jobs
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const similarJobs = JOBS.filter(j =>
    j.id !== job.id &&
    (j.tags.some(tag => job.tags.includes(tag)) || j.company === job.company)
  ).slice(0, 3);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg grid-bg pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm text-[#7A8499] mb-6">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/jobs" className="hover:text-gold transition-colors">Jobs</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{job.title}</span>
          </div>

          <div className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl overflow-hidden mb-8">
            <JobDetail job={job} />
          </div>

          {similarJobs.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-2xl mb-6">
                Similar <span className="text-gold">Jobs</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarJobs.map((similarJob) => (
                  <JobCard
                    key={similarJob.id}
                    job={similarJob}
                    onClick={() => navigate(`/jobs/${similarJob.id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default JobDetailPage;
