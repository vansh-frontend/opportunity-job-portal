import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, MapPin, Users, Calendar, Briefcase } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import JobCard from '../components/JobCard';
import { COMPANIES } from '../data/companies';
import { JOBS } from '../data/jobs';

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = COMPANIES.find(c => c.id === parseInt(id));

  if (!company) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-bg grid-bg pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-white mb-4">Company Not Found</h1>
            <Link to="/companies" className="text-gold hover:text-gold-light">
              Browse all companies
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const companyJobs = JOBS.filter(job => job.company === company.name);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg grid-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm text-[#7A8499] mb-6">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/companies" className="hover:text-gold transition-colors">Companies</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{company.name}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl overflow-hidden mb-8"
          >
            <div
              className={`h-48 bg-gradient-to-r ${company.color} relative`}
            >
              <div className="absolute -bottom-12 left-8">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${company.color} border-4 border-surface flex items-center justify-center text-white font-bold text-4xl shadow-xl`}>
                  {company.logo}
                </div>
              </div>
            </div>

            <div className="pt-16 pb-8 px-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="font-display font-bold text-3xl text-white">
                      {company.name}
                    </h1>
                    {company.verified && (
                      <CheckCircle className="w-6 h-6 text-gold fill-gold" />
                    )}
                  </div>
                  <p className="text-lg text-[#7A8499] mb-4">{company.tagline}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-[#7A8499]">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Founded {company.founded}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#7A8499]">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{company.employees} employees</span>
                </div>
                <div className="flex items-center space-x-2 text-[#7A8499]">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">{company.industry}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#7A8499]">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{company.location}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6">
                <h2 className="font-display font-bold text-2xl mb-4">About</h2>
                <p className="text-[#7A8499] leading-relaxed">{company.description}</p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-6">
                  Open Positions at <span className="text-gold">{company.name}</span>
                </h2>
                <div className="space-y-4">
                  {companyJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6">
                <h3 className="font-display font-bold text-xl mb-4">Perks & Culture</h3>
                <div className="space-y-3">
                  {company.perks.map((perk) => (
                    <div
                      key={perk}
                      className="flex items-center space-x-2 text-[#7A8499]"
                    >
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-sm">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-6">
                <h3 className="font-display font-bold text-xl mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-[#7A8499] mb-1">Open Positions</div>
                    <div className="text-2xl font-bold text-gold">{companyJobs.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#7A8499] mb-1">Industry</div>
                    <div className="text-white font-medium">{company.industry}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#7A8499] mb-1">Headquarters</div>
                    <div className="text-white font-medium">{company.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CompanyProfile;
