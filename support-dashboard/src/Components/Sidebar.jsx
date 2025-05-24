import { FaInbox, FaUserFriends, FaCog } from "react-icons/fa";

const Sidebar = ({ onSelectUser }) => {
  const users = ["Rani", "Rahul", "Pooja"];

  return (
    <div className="h-screen w-16 bg-gray-900 text-white flex flex-col items-center py-6 gap-6">
      {/* Logo */}
      <div className="text-xl font-bold">B</div>

      {/* Icons */}
      <div className="flex flex-col gap-6 text-2xl">
        <FaInbox className="cursor-pointer hover:text-blue-400" title="Inbox" />
        <FaUserFriends className="cursor-pointer hover:text-blue-400" title="Users" />
        <FaCog className="cursor-pointer hover:text-blue-400" title="Settings" />
      </div>

      {/* User List */}
      <div className="mt-6 flex flex-col gap-4 text-sm">
        {users.map((user, index) => (
          <button
            key={index}
            onClick={() => onSelectUser(user)}
            className="rotate-90 hover:text-blue-400"
            title={user}
          >
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

