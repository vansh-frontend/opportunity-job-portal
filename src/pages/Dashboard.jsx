import { motion } from 'framer-motion';
import { Briefcase, Calendar, Award, Bookmark, TrendingUp, Clock, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import StatusPill from '../components/StatusPill';
import ProfileCard from '../components/ProfileCard';
import { useStore } from '../store/useStore';
import { JOBS } from '../data/jobs';
import { MOCK_USER, RECOMMENDED_JOBS } from '../data/user';

const Dashboard = () => {
  const navigate = useNavigate();
  const { applications, savedJobs, applyToJob, user } = useStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const stats = [
    { label: 'Applications Sent', value: applications.length, icon: Briefcase, color: 'from-blue-500 to-blue-700' },
    { label: 'Interviews Scheduled', value: applications.filter(a => a.status === 'Interview').length, icon: Calendar, color: 'from-green-500 to-green-700' },
    { label: 'Offers Received', value: applications.filter(a => a.status === 'Offer Received').length, icon: Award, color: 'from-gold to-gold-light' },
    { label: 'Saved Jobs', value: savedJobs.size, icon: Bookmark, color: 'from-purple-500 to-purple-700' }
  ];

  const funnelData = [
    { name: 'Applied', value: 6, fill: '#D4A843' },
    { name: 'Reviewed', value: 4, fill: '#F2C96A' },
    { name: 'Shortlisted', value: 3, fill: '#D4A843' },
    { name: 'Interviewed', value: 2, fill: '#F2C96A' },
    { name: 'Offered', value: 1, fill: '#D4A843' }
  ];

  const savedJobsList = Array.from(savedJobs).slice(0, 5).map(jobId => JOBS.find(j => j.id === jobId)).filter(Boolean);

  const recommendedJobs = RECOMMENDED_JOBS.map(rec => ({
    ...JOBS.find(j => j.id === rec.jobId),
    match: rec.match
  })).filter(j => j.id);

  const upcomingDeadlines = JOBS.filter(job => job.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5)
    .map(job => ({
      ...job,
      daysLeft: differenceInDays(new Date(job.deadline), new Date())
    }));

  const activityFeed = [
    { action: 'Applied to', target: 'Product Designer at Paytm', time: '2 hours ago' },
    { action: 'Saved', target: 'UI Design Lead at Amazon', time: '5 hours ago' },
    { action: 'Profile viewed by', target: 'Google India recruiters', time: '1 day ago' },
    { action: 'Application status updated', target: 'Design Systems Engineer', time: '2 days ago' },
    { action: 'Shortlisted for', target: 'UI Design Lead at Amazon', time: '3 days ago' }
  ];

  const getDeadlineColor = (days) => {
    if (days < 3) return 'border-red-500/30 bg-red-500/10';
    if (days < 7) return 'border-yellow-500/30 bg-yellow-500/10';
    return 'border-green-500/30 bg-green-500/10';
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg grid-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-4xl mb-2">
                Welcome back, <span className="text-gold">{user?.displayName || MOCK_USER.name}</span>
              </h1>
              <p className="text-[#7A8499]">Here's what's happening with your applications</p>
            </div>
            <ProfileCard />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6 hover:border-[rgba(212,168,67,0.35)] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[#7A8499]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6"
            >
              <h2 className="font-display font-bold text-xl mb-6">My Applications</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 bg-bg-2 rounded-xl hover:bg-surface-2 transition-colors cursor-pointer"
                    onClick={() => navigate(`/jobs/${app.jobId}`)}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${app.companyColor} flex items-center justify-center text-white font-bold`}>
                        {app.companyLogo}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white text-sm">{app.jobTitle}</h3>
                        <p className="text-xs text-[#7A8499]">{app.company}</p>
                        <p className="text-xs text-[#7A8499] mt-1">{app.lastUpdate}</p>
                      </div>
                    </div>
                    <StatusPill status={app.status} />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6"
            >
              <h2 className="font-display font-bold text-xl mb-6">Application Funnel</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={funnelData}>
                  <XAxis dataKey="name" stroke="#7A8499" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#7A8499" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#161C27',
                      border: '1px solid rgba(212,168,67,0.35)',
                      borderRadius: '8px',
                      color: '#EEF0F5'
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6"
            >
              <h2 className="font-display font-bold text-xl mb-6">Saved Jobs</h2>
              <div className="space-y-4">
                {savedJobsList.map((job) => {
                  const daysLeft = job.deadline ? differenceInDays(new Date(job.deadline), new Date()) : null;
                  return (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 bg-bg-2 rounded-xl hover:bg-surface-2 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-white text-sm mb-1">{job.title}</h3>
                        <p className="text-xs text-[#7A8499]">{job.company}</p>
                        {daysLeft !== null && (
                          <p className="text-xs text-gold mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {daysLeft} days left
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => applyToJob(job.id)}
                        className="px-4 py-2 bg-gold text-black rounded-lg text-sm font-medium hover:bg-gold-light transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6"
            >
              <h2 className="font-display font-bold text-xl mb-6">Recommended For You</h2>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 bg-bg-2 rounded-xl hover:bg-surface-2 transition-colors cursor-pointer"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-white text-sm">{job.title}</h3>
                      <span className="px-2 py-1 bg-gold/10 border border-gold/30 rounded-lg text-xs font-bold text-gold">
                        {job.match}% Match
                      </span>
                    </div>
                    <p className="text-xs text-[#7A8499]">{job.company} · {job.location}</p>
                    <p className="text-xs text-gold mt-1">₹{job.salary}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6 mb-8"
          >
            <h2 className="font-display font-bold text-xl mb-6">Upcoming Deadlines</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {upcomingDeadlines.map((job) => (
                <div
                  key={job.id}
                  className={`flex-shrink-0 w-64 border rounded-xl p-4 ${getDeadlineColor(job.daysLeft)}`}
                >
                  <h3 className="font-medium text-white text-sm mb-1">{job.title}</h3>
                  <p className="text-xs text-[#7A8499] mb-3">{job.company}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#7A8499]">{job.daysLeft} days left</span>
                    <button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="text-xs text-gold hover:text-gold-light transition-colors font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6"
            >
              <h2 className="font-display font-bold text-xl mb-6">Profile Completion</h2>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#1E2535"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#D4A843"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - MOCK_USER.profileCompletion / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-display font-bold text-gold">
                      {MOCK_USER.profileCompletion}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#7A8499]">Add Skills</span>
                  <span className="text-green-500">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#7A8499]">Upload Resume</span>
                  <span className="text-green-500">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#7A8499]">Add Projects</span>
                  <span className="text-red-500">✗</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#7A8499]">Add Certifications</span>
                  <span className="text-red-500">✗</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6"
            >
              <h2 className="font-display font-bold text-xl mb-6">Activity Feed</h2>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {activityFeed.map((activity, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        <span className="text-[#7A8499]">{activity.action}</span>{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-[#7A8499] mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
