import { useStore } from '../store/useStore';

const FilterSidebar = () => {
  const { filters, setFilter, clearFilters } = useStore();

  const workTypes = ['Full-time', 'Internship', 'Part-time'];
  const workModes = ['Remote', 'On-site', 'Hybrid'];

  const handleCheckbox = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setFilter(key, updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-bold text-lg mb-4">Filters</h3>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-3 text-[#7A8499]">Work Type</h4>
        <div className="space-y-2">
          {workTypes.map(type => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => handleCheckbox('type', type)}
                className="w-4 h-4 rounded border-[rgba(212,168,67,0.35)] bg-surface checked:bg-gold checked:border-gold focus:ring-gold focus:ring-offset-0"
              />
              <span className="text-sm text-[#7A8499] group-hover:text-gold transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-3 text-[#7A8499]">Work Mode</h4>
        <div className="space-y-2">
          {workModes.map(mode => (
            <label key={mode} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.mode.includes(mode)}
                onChange={() => handleCheckbox('mode', mode)}
                className="w-4 h-4 rounded border-[rgba(212,168,67,0.35)] bg-surface checked:bg-gold checked:border-gold focus:ring-gold focus:ring-offset-0"
              />
              <span className="text-sm text-[#7A8499] group-hover:text-gold transition-colors">
                {mode}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-3 text-[#7A8499]">Salary Range (LPA)</h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#7A8499] block mb-1">Minimum</label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.salaryMin / 100000}
              onChange={(e) => setFilter('salaryMin', e.target.value * 100000)}
              className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <span className="text-xs text-gold">₹{filters.salaryMin / 100000}L</span>
          </div>
          <div>
            <label className="text-xs text-[#7A8499] block mb-1">Maximum</label>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.salaryMax / 100000}
              onChange={(e) => setFilter('salaryMax', e.target.value * 100000)}
              className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <span className="text-xs text-gold">₹{filters.salaryMax / 100000}L</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-3 text-[#7A8499]">Posted Within</h4>
        <select
          value={filters.postedWithin || ''}
          onChange={(e) => setFilter('postedWithin', e.target.value || null)}
          className="w-full px-3 py-2 bg-surface border border-[rgba(212,168,67,0.35)] rounded-xl text-sm text-white focus:outline-none focus:border-gold"
        >
          <option value="">Any time</option>
          <option value="1">Last 24 hours</option>
          <option value="7">Last week</option>
          <option value="30">Last month</option>
        </select>
      </div>

      <div className="flex space-x-2 pt-4">
        <button className="flex-1 px-4 py-2 bg-gold text-black rounded-xl font-medium text-sm hover:bg-gold-light transition-colors">
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="px-4 py-2 border border-[rgba(212,168,67,0.35)] text-gold rounded-xl text-sm hover:bg-[rgba(212,168,67,0.1)] transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
