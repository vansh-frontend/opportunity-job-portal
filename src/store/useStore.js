import { create } from 'zustand';
import { JOBS } from '../data/jobs';
import { MOCK_APPLICATIONS, MOCK_NOTIFICATIONS } from '../data/user';
// firebase helpers for authentication
// low-level firebase API is wrapped by authController
import { doLogin, doSignup, loginWithGoogle as loginWithGoogleAuth, doLogout } from '../pages/authController';
import { auth, googleProvider } from '../pages/firebase';
import {
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  // signInWithPopup,
  // signOut
} from 'firebase/auth';

export const useStore = create((set, get) => ({
  // authentication state
  user: null,

  setUser: (user) => set({ user }),

  login: async (email, password) => {
    try {
      const cred = await doLogin(email, password);
      const u = cred.user;
      const userObj = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        photoURL: u.photoURL,
        phoneNumber: u.phoneNumber
      };
      set({ user: userObj });
      return userObj;
    } catch (err) {
      throw err;
    }
  },

  signup: async (email, password, name, phone, photoURL) => {
    try {
      const cred = await doSignup(email, password);
      const u = cred.user;
      // update displayName and photoURL on firebase auth user if available
      if (u.updateProfile) {
        const updates = {};
        if (name) updates.displayName = name;
        if (photoURL) updates.photoURL = photoURL;
        if (Object.keys(updates).length) {
          await u.updateProfile(updates);
        }
      }
      const userObj = {
        uid: u.uid,
        email: u.email,
        displayName: name || u.displayName,
        photoURL: photoURL || u.photoURL,
        phoneNumber: phone || u.phoneNumber
      };
      set({ user: userObj });
      return userObj;
    } catch (err) {
      throw err;
    }
  },

  loginWithGoogle: async () => {
    try {
      const result = await loginWithGoogleAuth();
      const u = result.user;
      const userObj = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        photoURL: u.photoURL,
        phoneNumber: u.phoneNumber
      };
      set({ user: userObj });
      return userObj;
    } catch (err) {
      throw err;
    }
  },

  logout: async () => {
    await doLogout();
    set({ user: null });
  },

  updatePhoto: (url) => {
    set((state) => ({ user: { ...state.user, photoURL: url } }));
  },

  appliedJobs: new Set([1, 2, 4, 6, 8, 3]),

  applyToJob: (jobId) => {
    const job = JOBS.find(j => j.id === jobId);
    if (!job) return;

    set((state) => {
      const newAppliedJobs = new Set(state.appliedJobs);
      newAppliedJobs.add(jobId);

      const newApplication = {
        id: state.applications.length + 1,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        companyLogo: job.company[0],
        companyColor: "from-gold to-gold-light",
        status: "Applied",
        appliedDate: new Date().toISOString().split('T')[0],
        lastUpdate: "Just now"
      };

      return {
        appliedJobs: newAppliedJobs,
        applications: [newApplication, ...state.applications]
      };
    });

    get().addToast("Applied Successfully!", "success");
  },

  savedJobs: new Set([1, 2, 3, 4, 5]),

  toggleSaveJob: (jobId) => {
    set((state) => {
      const newSavedJobs = new Set(state.savedJobs);
      const wasSaved = newSavedJobs.has(jobId);

      if (wasSaved) {
        newSavedJobs.delete(jobId);
        get().addToast("Removed from saved", "info");
      } else {
        newSavedJobs.add(jobId);
        get().addToast("Job Saved!", "success");
      }

      return { savedJobs: newSavedJobs };
    });
  },

  applications: MOCK_APPLICATIONS,

  filters: {
    type: [],
    mode: [],
    experience: [],
    domain: [],
    salaryMin: 0,
    salaryMax: 200000,
    postedWithin: null
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    }));
  },

  clearFilters: () => {
    set({
      filters: {
        type: [],
        mode: [],
        experience: [],
        domain: [],
        salaryMin: 0,
        salaryMax: 200000,
        postedWithin: null
      }
    });
  },

  getFilteredJobs: () => {
    const { filters } = get();
    let filtered = [...JOBS];

    if (filters.type.length > 0) {
      filtered = filtered.filter(job => filters.type.includes(job.type));
    }

    if (filters.mode.length > 0) {
      filtered = filtered.filter(job => filters.mode.includes(job.mode));
    }

    if (filters.salaryMin > 0 || filters.salaryMax < 200000) {
      filtered = filtered.filter(job => {
        const salary = parseInt(job.salary.split('-')[0].replace('K', '000').replace('L', '00000'));
        return salary >= filters.salaryMin && salary <= filters.salaryMax;
      });
    }

    return filtered;
  },

  toasts: [],

  addToast: (message, type = "info") => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }]
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, 3000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter(toast => toast.id !== id)
    }));
  },

  selectedJobId: 1,

  setSelectedJob: (id) => {
    set({ selectedJobId: id });
  },

  notifications: MOCK_NOTIFICATIONS,

  markAllRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true }))
    }));
  },

  searchQuery: '',

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  isSearchModalOpen: false,

  toggleSearchModal: () => {
    set((state) => ({ isSearchModalOpen: !state.isSearchModalOpen }));
  }
}));
