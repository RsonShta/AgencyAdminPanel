import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserControls from '../components/UsersControl';
import BulkActions from '../components/BulkActions';
import UserTable from '../components/UserTable';
import AddUserModal from '../components/AddUserModal';
import '../styles/users.css';

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  userRole: string;
};

const UsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'alice01', name: 'Alice Smith', email: 'alice@example.com', status: 'Active', userRole: 'admin' },
    { id: 2, username: 'bob02', name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', userRole: 'manager' },
    { id: 3, username: 'charlie03', name: 'Charlie Rose', email: 'charlie@example.com', status: 'Active', userRole: 'support' },
    { id: 4, username: 'diana04', name: 'Diana Prince', email: 'diana@example.com', status: 'Inactive', userRole: 'superadmin' },
  ]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const handleEnableSelected = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status: 'Active' } : user
      )
    );
  };

  const handleDisableSelected = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status: 'Inactive' } : user
      )
    );
  };

  interface NewUser {
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    userRole: string;
  }

  const handleAddUser = (newUser: NewUser): void => {
    const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const fullName = `${newUser.firstName} ${newUser.lastName}`;
    const userToAdd: User = {
      id: newId,
      username: newUser.username,
      name: fullName,
      email: newUser.email,
      status: 'Active',
      userRole: newUser.userRole,
    };
    setUsers([...users, userToAdd]);
  };

  const isAnySelected = selectedUsers.length > 0;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <UserControls
          selectedUsers={selectedUsers}
          onSearchChange={setSearchQuery}
          onAddUserClick={() => setIsAddModalOpen(true)}
        />

        <BulkActions
          isAnySelected={isAnySelected}
          onEnableSelected={handleEnableSelected}
          onDisableSelected={handleDisableSelected}
        />

        <UserTable
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onSelectionChange={setSelectedUsers}
          onDeleteUser={(id) => {
            if (window.confirm('Are you sure you want to delete this user?')) {
              setUsers((prev) => prev.filter((user) => user.id !== id));
              setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
            }
          }}
        />

        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddUser}
        />
      </div>
    </div>
  );
};

export default UsersPage;
