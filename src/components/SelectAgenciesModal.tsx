import React, { useState } from 'react';

export type Agency = {
  id: number;
  agencyName: string;
  email: string;
  status: 'Active' | 'Inactive';
};

type Props = {
  allAgencies: Agency[];
  selectedAgencyIds: number[];
  onClose: () => void;
  onSave: (selectedIds: number[]) => void;
};

const SelectAgenciesModal: React.FC<Props> = ({
  allAgencies,
  selectedAgencyIds,
  onClose,
  onSave,
}) => {
  const [selected, setSelected] = useState<number[]>([...selectedAgencyIds]);

  const toggleAgency = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="select-agencies-backdrop">
      <div className="select-agencies-modal">
        <h3>Select Agencies</h3>
        <div className="agency-list-scrollable">
          {allAgencies.map(agency => (
            <label key={agency.id} className="agency-item">
              <input
                type="checkbox"
                checked={selected.includes(agency.id)}
                onChange={() => toggleAgency(agency.id)}
              />
              {agency.agencyName}
            </label>
          ))}
        </div>
        <div className="agency-modal-actions">
          <button onClick={onClose} className="btn-cancel">Cancel</button>
          <button onClick={() => onSave(selected)} className="btn-submit">Save</button>
        </div>
      </div>
    </div>
  );
};

export default SelectAgenciesModal;
