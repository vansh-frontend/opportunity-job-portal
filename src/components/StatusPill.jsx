const StatusPill = ({ status }) => {
  const statusConfig = {
    'Interview': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
    'Under Review': { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
    'Applied': { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
    'Offer Received': { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
    'Rejected': { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
    'Shortlisted': { bg: 'bg-gold/10', border: 'border-gold/30', text: 'text-gold' }
  };

  const config = statusConfig[status] || statusConfig['Applied'];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.border} ${config.text}`}>
      {status}
    </span>
  );
};

export default StatusPill;
