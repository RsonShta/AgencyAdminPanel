import React, { useState, useEffect } from 'react';

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  userRole: string;
};

type UserTableProps = {
  users: User[];
  selectedUsers: number[];
  onSelectionChange: (selected: number[]) => void;
  onDeleteUser: (id: number) => void;
  pageSize?: number;
};

const UserTable: React.FC<UserTableProps> = ({
  users,
  selectedUsers,
  onSelectionChange,
  onDeleteUser,
  pageSize = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  const totalPages = Math.ceil(users.length / pageSize);
  const pagedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleCheckbox = (id: number) => {
    onSelectionChange(
      selectedUsers.includes(id)
        ? selectedUsers.filter((i) => i !== id)
        : [...selectedUsers, id]
    );
  };

  const toggleSelectAll = () => {
    if (pagedUsers.every((u) => selectedUsers.includes(u.id))) {
      onSelectionChange(
        selectedUsers.filter((id) => !pagedUsers.some((u) => u.id === id))
      );
    } else {
      const newSelected = Array.from(
        new Set([...selectedUsers, ...pagedUsers.map((u) => u.id)])
      );
      onSelectionChange(newSelected);
    }
  };

  return (
    <section className="user-list">
      <table className="supplier-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={pagedUsers.every((u) => selectedUsers.includes(u.id))}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="header-green">ID</th>
            <th className="header-green">Username</th>
            <th className="header-green">Full Name</th>
            <th className="header-green">Role</th>
            <th className="header-green">Status</th>
            <th className="header-green">Email</th>
            <th className="header-green">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pagedUsers.length === 0 ? (
            <tr>
              <td colSpan={8} className="no-suppliers">No users found.</td>
            </tr>
          ) : (
            pagedUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleCheckbox(user.id)}
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.userRole}</td>
                <td>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.email}</td>
                <td>
                  <button className="icon-button edit">
                    <i className="fas fa-edit" />
                  </button>
                  <button onClick={() => onDeleteUser(user.id)} className="icon-button delete">
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          ))}
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default UserTable;
