import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Users, Trophy, CheckCircle, Clock } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';
import PageWrapper from '../components/PageWrapper';
import { OPPORTUNITIES } from '../data/opportunities';

const OpportunityDetail = () => {
  const { id } = useParams();
  const opportunity = OPPORTUNITIES.find(o => o.id === parseInt(id));

  if (!opportunity) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-bg grid-bg pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-white mb-4">Opportunity Not Found</h1>
            <Link to="/opportunities" className="text-gold hover:text-gold-light">
              Browse all opportunities
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

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

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg grid-bg pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm text-[#7A8499] mb-6">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/opportunities" className="hover:text-gold transition-colors">Opportunities</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{opportunity.title}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-[rgba(212,168,67,0.12)]">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r ${getTypeColor(opportunity.type)} mb-4`}>
                    {opportunity.type}
                  </span>
                  <h1 className="font-display font-bold text-4xl text-white mb-2">
                    {opportunity.title}
                  </h1>
                  <p className="text-xl text-[#7A8499]">{opportunity.org}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-bg-2 rounded-xl p-4">
                  <Trophy className="w-5 h-5 text-gold mb-2" />
                  <div className="text-xs text-[#7A8499] mb-1">Prize</div>
                  <div className="text-white font-bold">{opportunity.prize}</div>
                </div>
                <div className="bg-bg-2 rounded-xl p-4">
                  <Users className="w-5 h-5 text-gold mb-2" />
                  <div className="text-xs text-[#7A8499] mb-1">Team Size</div>
                  <div className="text-white font-bold">{opportunity.teamSize}</div>
                </div>
                <div className="bg-bg-2 rounded-xl p-4">
                  <Calendar className="w-5 h-5 text-gold mb-2" />
                  <div className="text-xs text-[#7A8499] mb-1">Deadline</div>
                  <div className="text-white font-bold">{format(new Date(opportunity.deadline), 'MMM d, yyyy')}</div>
                </div>
                <div className="bg-bg-2 rounded-xl p-4">
                  <Clock className="w-5 h-5 text-gold mb-2" />
                  <div className="text-xs text-[#7A8499] mb-1">Days Left</div>
                  <div className="text-white font-bold">{daysLeft} days</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm text-[#7A8499] mb-2">
                  <span>Spots Filled</span>
                  <span>{opportunity.spotsFilledPct}%</span>
                </div>
                <div className="w-full h-3 bg-bg-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${opportunity.spotsFilledPct}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-gold to-gold-light"
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gold text-black font-bold py-4 rounded-xl hover:bg-gold-light transition-all hover:shadow-gold"
              >
                Register Now
              </motion.button>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl mb-4">About</h2>
                <p className="text-[#7A8499] leading-relaxed">{opportunity.description}</p>
              </div>

              {opportunity.phases && (
                <div>
                  <h2 className="font-display font-bold text-2xl mb-4">Timeline</h2>
                  <div className="space-y-3">
                    {opportunity.phases.map((phase, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-gold font-bold text-sm">{idx + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{phase}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {opportunity.eligibility && (
                <div>
                  <h2 className="font-display font-bold text-2xl mb-4">Eligibility</h2>
                  <ul className="space-y-2">
                    {opportunity.eligibility.map((req, idx) => (
                      <li key={idx} className="flex items-start text-[#7A8499]">
                        <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-gold flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {opportunity.benefits && (
                <div>
                  <h2 className="font-display font-bold text-2xl mb-4">Benefits</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {opportunity.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center space-x-2 bg-bg-2 rounded-lg p-3"
                      >
                        <CheckCircle className="w-4 h-4 text-gold" />
                        <span className="text-sm text-[#7A8499]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {opportunity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-surface-2 border border-[rgba(212,168,67,0.12)] text-white rounded-lg text-sm font-mono-custom"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OpportunityDetail;
