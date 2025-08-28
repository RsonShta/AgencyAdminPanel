import React from 'react';

type AgencyControlsProps = {
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
};

const AgencyControls: React.FC<AgencyControlsProps> = ({
  onSearchChange,
  onAddClick,
}) => {
  return (
    <section className="user-controls">
      <input
        type="text"
        placeholder="Search agencies..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button className="add-user-btn" onClick={onAddClick}>
        <i className="fas fa-user-plus"></i> Add Agency
      </button>
    </section>
  );
};

export default AgencyControls;
