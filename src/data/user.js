export const MOCK_USER = {
  name: "Tech_Wizards",
  college: "CBIT Hyderabad",
  role: "Student · Final Year · CSE",
  location: "Hyderabad, IN",
  avatar: "TW",
  email: "tech.wizards@cbit.ac.in",
  phone: "+91 98765 43210",
  cgpa: "8.7",
  about: "Passionate about design and technology. Currently exploring UI/UX design and frontend development. Love solving problems through creative solutions.",
  areasOfInterest: ["UI/UX Design", "Frontend Development", "Product Design", "Design Systems"],
  profileCompletion: 75,
  profileViews: 234,
  skills: {
    design: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    frontend: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML/CSS"],
    soft: ["Communication", "Team Collaboration", "Problem Solving", "Time Management"]
  },
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform UI",
      description: "Designed and developed a complete e-commerce platform interface with modern UI patterns and responsive design.",
      tech: ["React", "Tailwind", "Figma"],
      github: "https://github.com/techwizards/ecommerce",
      live: "https://ecommerce-demo.vercel.app"
    },
    {
      id: 2,
      title: "College Event Management System",
      description: "Built a comprehensive event management system for college fests and technical events.",
      tech: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/techwizards/event-manager",
      live: null
    },
    {
      id: 3,
      title: "Design System Documentation",
      description: "Created a comprehensive design system with reusable components and detailed documentation.",
      tech: ["Figma", "Storybook", "React"],
      github: "https://github.com/techwizards/design-system",
      live: "https://design-system-docs.vercel.app"
    }
  ],
  certifications: [
    {
      id: 1,
      title: "Google UX Design Professional Certificate",
      issuer: "Google",
      date: "2025-12",
      credentialId: "GUX-2025-12345"
    },
    {
      id: 2,
      title: "Frontend Developer Certification",
      issuer: "freeCodeCamp",
      date: "2025-10",
      credentialId: "FCC-FD-2025-67890"
    },
    {
      id: 3,
      title: "UI/UX Design Specialization",
      issuer: "Coursera",
      date: "2025-08",
      credentialId: "CRSRA-UIUX-2025-11223"
    }
  ]
};

export const MOCK_APPLICATIONS = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Senior UI/UX Designer",
    company: "Google India",
    companyLogo: "G",
    companyColor: "from-red-500 to-red-700",
    status: "Interview",
    appliedDate: "2026-02-15",
    lastUpdate: "2 days ago"
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: "Product Design Intern",
    company: "Microsoft",
    companyLogo: "M",
    companyColor: "from-blue-400 to-blue-600",
    status: "Under Review",
    appliedDate: "2026-02-20",
    lastUpdate: "5 days ago"
  },
  {
    id: 3,
    jobId: 4,
    jobTitle: "Design Systems Engineer",
    company: "Flipkart",
    companyLogo: "F",
    companyColor: "from-purple-400 to-purple-600",
    status: "Offer Received",
    appliedDate: "2026-02-10",
    lastUpdate: "1 day ago"
  },
  {
    id: 4,
    jobId: 6,
    jobTitle: "UI Design Lead",
    company: "Amazon",
    companyLogo: "A",
    companyColor: "from-yellow-500 to-orange-500",
    status: "Shortlisted",
    appliedDate: "2026-02-18",
    lastUpdate: "3 days ago"
  },
  {
    id: 5,
    jobId: 8,
    jobTitle: "Product Designer",
    company: "Paytm",
    companyLogo: "P",
    companyColor: "from-blue-500 to-indigo-600",
    status: "Applied",
    appliedDate: "2026-02-25",
    lastUpdate: "Just now"
  },
  {
    id: 6,
    jobId: 3,
    jobTitle: "UX Researcher",
    company: "Zomato",
    companyLogo: "Z",
    companyColor: "from-teal-400 to-teal-600",
    status: "Rejected",
    appliedDate: "2026-02-12",
    lastUpdate: "1 week ago"
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "application",
    title: "Application Update",
    message: "Your application for Design Systems Engineer at Flipkart has been moved to Offer Received",
    time: "2 hours ago",
    read: false
  },
  {
    id: 2,
    type: "deadline",
    title: "Deadline Approaching",
    message: "The deadline for Senior UI/UX Designer at Google India is in 3 days",
    time: "5 hours ago",
    read: false
  },
  {
    id: 3,
    type: "recommendation",
    title: "New Job Match",
    message: "We found 3 new jobs matching your profile",
    time: "1 day ago",
    read: true
  },
  {
    id: 4,
    type: "profile",
    title: "Profile Viewed",
    message: "Your profile was viewed by Amazon recruiters",
    time: "2 days ago",
    read: true
  },
  {
    id: 5,
    type: "application",
    title: "Application Received",
    message: "Your application for Product Designer at Paytm has been received",
    time: "3 days ago",
    read: true
  }
];

export const RECOMMENDED_JOBS = [
  {
    id: 7,
    jobId: 7,
    match: 94
  },
  {
    id: 9,
    jobId: 9,
    match: 89
  },
  {
    id: 10,
    jobId: 10,
    match: 87
  },
  {
    id: 5,
    jobId: 5,
    match: 85
  }
];
