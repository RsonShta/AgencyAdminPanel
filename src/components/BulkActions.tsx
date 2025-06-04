import React from 'react';

type BulkActionsProps = {
  isAnySelected: boolean;
  onEnableSelected: () => void;
  onDisableSelected: () => void;
};


const BulkActions: React.FC<BulkActionsProps> = ({
  isAnySelected,
  onEnableSelected,
  onDisableSelected,
}) => {
  return (
    <section className="bulk-actions">
      <button onClick={onEnableSelected} disabled={!isAnySelected}>
        <i className="fas fa-check"></i> Enable
      </button>
      <button onClick={onDisableSelected} disabled={!isAnySelected}>
        <i className="fas fa-ban"></i> Disable
      </button>
    </section>
  );
};

export default BulkActions;
