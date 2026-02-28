import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Edit2, GraduationCap, Briefcase, Eye, ExternalLink, Github } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
// import fallback but we'll use store user
import { MOCK_USER } from '../data/user';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { applications, user, updatePhoto } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [newAvatar, setNewAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handlePhoto = async (file) => {
    if (!file) return;
    try {
      const { uploadToImgbb } = await import('../utils/imgbb');
      const url = await uploadToImgbb(file);
      updatePhoto(url);
      setPreview(null);
      setNewAvatar(null);
    } catch (err) {
      console.error('photo upload failed', err);
    }
  };

  const tabs = ['Overview', 'Skills', 'Projects', 'Certifications'];

  const profileStats = [
    { label: 'Applications', value: applications.length },
    { label: 'Profile Views', value: MOCK_USER.profileViews },
    { label: 'Saved Jobs', value: 5 },
    { label: 'Interviews', value: applications.filter(a => a.status === 'Interview').length }
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg grid-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl overflow-hidden mb-8"
          >
            <div className="h-32 bg-gradient-to-r from-gold/20 to-gold-light/20"></div>

            <div className="px-8 pb-8">
              <div className="flex items-start justify-between -mt-16 mb-6">
                <div className="flex items-end space-x-4">
                  <div className="relative w-32 h-32">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gold to-gold-light border-4 border-surface flex items-center justify-center text-black font-bold text-4xl shadow-xl overflow-hidden">
                      {user?.photoURL ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover rounded-2xl" /> : user?.displayName?.charAt(0) || MOCK_USER.avatar}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setNewAvatar(file);
                        if (file) setPreview(URL.createObjectURL(file));
                      }}
                    />
                  </div>
                  {preview && (
                    <div className="mt-2 flex items-center space-x-2">
                      <img src={preview} alt="preview" className="w-12 h-12 rounded-full object-cover" />
                      <button
                        className="px-3 py-1 text-sm text-black bg-gold rounded-xl"
                        onClick={() => handlePhoto(newAvatar)}
                      >
                        Save
                      </button>
                      <button
                        className="px-3 py-1 text-sm text-white bg-surface rounded-xl"
                        onClick={() => { setPreview(null); setNewAvatar(null); }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  <div className="pb-2">
                    <h1 className="font-display font-bold text-3xl text-white mb-1">
                      {user?.displayName || MOCK_USER.name}
                    </h1>
                    <p className="text-[#7A8499] mb-2">{MOCK_USER.role}</p>
                    <div className="flex items-center space-x-4 text-sm text-[#7A8499]">
                      <span className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        {MOCK_USER.college}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {MOCK_USER.location}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="mt-4 flex items-center space-x-2 px-4 py-2 border border-[rgba(212,168,67,0.35)] text-gold rounded-xl hover:bg-[rgba(212,168,67,0.1)] transition-all">
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {profileStats.map((stat) => (
                  <div key={stat.label} className="bg-bg-2 rounded-xl p-4 text-center">
                    <div className="text-2xl font-display font-bold text-gold mb-1">{stat.value}</div>
                    <div className="text-xs text-[#7A8499]">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2 border-b border-[rgba(212,168,67,0.12)] mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium text-sm transition-all ${
                      activeTab === tab
                        ? 'text-gold border-b-2 border-gold'
                        : 'text-[#7A8499] hover:text-gold'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'Overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-display font-bold text-xl mb-3">About</h2>
                    <p className="text-[#7A8499] leading-relaxed">{MOCK_USER.about}</p>
                  </div>

                  <div>
                    <h2 className="font-display font-bold text-xl mb-3">Contact Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 text-[#7A8499]">
                        <Mail className="w-5 h-5" />
                        <span className="text-sm">{user?.email || MOCK_USER.email}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-[#7A8499]">
                        <Phone className="w-5 h-5" />
                        <span className="text-sm">{user?.phoneNumber || MOCK_USER.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display font-bold text-xl mb-3">Academic Details</h2>
                    <div className="bg-bg-2 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">{MOCK_USER.college}</p>
                          <p className="text-sm text-[#7A8499]">Computer Science Engineering</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gold font-bold text-2xl">{MOCK_USER.cgpa}</p>
                          <p className="text-xs text-[#7A8499]">CGPA</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display font-bold text-xl mb-3">Areas of Interest</h2>
                    <div className="flex flex-wrap gap-2">
                      {MOCK_USER.areasOfInterest.map((interest) => (
                        <span
                          key={interest}
                          className="px-4 py-2 bg-gold/10 border border-gold/30 text-gold rounded-xl text-sm font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'Skills' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-display font-bold text-xl mb-4">Design Tools</h2>
                    <div className="flex flex-wrap gap-2">
                      {MOCK_USER.skills.design.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-surface-2 border border-[rgba(212,168,67,0.12)] text-white rounded-lg font-mono-custom"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display font-bold text-xl mb-4">Frontend Development</h2>
                    <div className="flex flex-wrap gap-2">
                      {MOCK_USER.skills.frontend.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-surface-2 border border-[rgba(212,168,67,0.12)] text-white rounded-lg font-mono-custom"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display font-bold text-xl mb-4">Soft Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {MOCK_USER.skills.soft.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-surface-2 border border-[rgba(212,168,67,0.12)] text-white rounded-lg font-mono-custom"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-gold text-black rounded-xl font-medium hover:bg-gold-light transition-colors">
                    + Add Skill
                  </button>
                </motion.div>
              )}

              {activeTab === 'Projects' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {MOCK_USER.projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-bg-2 border border-[rgba(212,168,67,0.12)] rounded-xl p-6 hover:border-[rgba(212,168,67,0.35)] transition-all"
                    >
                      <h3 className="font-display font-bold text-lg text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-[#7A8499] text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-surface-2 text-[#7A8499] rounded-lg text-xs font-mono-custom"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gold hover:text-gold-light text-sm transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gold hover:text-gold-light text-sm transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'Certifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {MOCK_USER.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-start justify-between bg-bg-2 border border-[rgba(212,168,67,0.12)] rounded-xl p-6 hover:border-[rgba(212,168,67,0.35)] transition-all"
                    >
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-lg text-white mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-[#7A8499] text-sm mb-2">{cert.issuer}</p>
                        <p className="text-xs text-[#7A8499]">Issued: {cert.date}</p>
                        <p className="text-xs font-mono-custom text-[#7A8499] mt-2">
                          ID: {cert.credentialId}
                        </p>
                      </div>
                      <button className="text-gold hover:text-gold-light transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Profile;
