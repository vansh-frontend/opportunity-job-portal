import { useStore } from '../store/useStore';

const ProfileCard = () => {
  const { user } = useStore();

  const displayName = user?.displayName || 'Guest';
  const email = user?.email || '';
  const phone = user?.phoneNumber || '';
  const avatar = user?.photoURL
    ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover rounded-full" />
    : displayName.charAt(0).toUpperCase();

  return (
    <div className="hidden lg:flex items-center space-x-4 bg-surface border border-[rgba(212,168,67,0.12)] rounded-2xl p-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black font-bold text-lg overflow-hidden">
        {avatar}
      </div>
      <div className="text-sm text-white">
        <div className="font-medium">{displayName}</div>
        {email && <div className="text-xs text-[#7A8499]">{email}</div>}
        {phone && <div className="text-xs text-[#7A8499]">{phone}</div>}
      </div>
    </div>
  );
};

export default ProfileCard;
