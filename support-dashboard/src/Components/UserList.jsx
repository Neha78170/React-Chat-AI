import React, { useEffect, useState } from 'react';
import UserItem from './UserItem';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        const usersWithStatus = data.map((user) => ({
          ...user,
          online: Math.random() > 0.5, // randomly online/offline
        }));
        setUsers(usersWithStatus);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-4 h-full shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Users</h3>
      <ul className="space-y-3">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
