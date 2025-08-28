import React from 'react';

type UserControlsProps = {
  selectedUsers: number[]; // you can keep this if needed or remove if unused here
  onSearchChange: (value: string) => void;
  onAddUserClick: () => void;
};

const UserControls: React.FC<UserControlsProps> = ({
  onSearchChange,
  onAddUserClick,
}) => {
  return (
    <section className="user-controls">
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button
        type="button"
        className="add-user-btn"
        onClick={onAddUserClick}
      >
        <i className="fas fa-user-plus"></i> Add User
      </button>
    </section>
  );
};

export default UserControls;
