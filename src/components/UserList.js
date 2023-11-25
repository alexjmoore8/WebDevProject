import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>{user.username} - {user.email}</div>
      ))}
    </div>
  );
};

export default UserList;
