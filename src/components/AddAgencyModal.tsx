import React, { useEffect, useState } from 'react';
import '../styles/agency.css';
import { useSupplierContext } from '../context/SupplierContext';

type Supplier = {
  id: string;
  name: string;
  selected: boolean;
  from: string;
  to: string;
  status: string;
};

type AddAgencyModalProps = {
  onClose: () => void;
  onAdd: (data: {
    id: string;
    name: string;
    code: string;
    status: "enabled" | "disabled";
  }) => void;
  nextId: number;
  onViewSuppliers: () => void;
};

const AddAgencyModal: React.FC<AddAgencyModalProps> = ({ onClose, onAdd, nextId, onViewSuppliers }) => {
  const today = new Date().toISOString().split('T')[0];
  const { suppliers: contextSuppliers } = useSupplierContext();

  const [formData, setFormData] = useState({
    agencyName: '',
    code: '',
    lastName: '',
    firstName: '',
    password: '',
    email: '',
    phone: '',
    contactPerson: '',
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(
    contextSuppliers.map(s => ({
      id: s.id.toString(),
      name: s.name,
      selected: false,
      from: today,
      to: '2099-12-31',
      status: 'Active',
    }))
  );

  const [showSuppliers, setShowSuppliers] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSupplierChange = (index: number, field: keyof Supplier, value: string | boolean) => {
    setSuppliers(prev =>
      prev.map((supplier, i) => (i === index ? { ...supplier, [field]: value } : supplier))
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSuppliers(prev => prev.map(supplier => ({ ...supplier, selected: checked })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd({
      id: nextId.toString(),
      name: formData.agencyName,
      code: formData.code,
      status: "enabled",
    });

    onClose();
  };

  return (
    <div className="add-agency-modal-backdrop" onClick={onClose}>
      <div className="add-agency-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Agency</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="agencyName">Agency Name</label>
              <input id="agencyName" name="agencyName" value={formData.agencyName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="code">Agency Code</label>
              <input id="code" name="code" value={formData.code} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person</label>
              <input id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
            </div>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="btn-select-suppliers"
              onClick={() => setShowSuppliers(!showSuppliers)}
            >
              {showSuppliers ? 'Hide Suppliers ▲' : 'Select Suppliers ▼'}
            </button>

            <div>
              <button type="submit" className="btn-submit">Save</button>
              <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            </div>
          </div>

          {showSuppliers && (
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th>Supplier ID</th>
                  <th>Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier, index) => (
                  <tr key={supplier.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={supplier.selected}
                        onChange={(e) => handleSupplierChange(index, 'selected', e.target.checked)}
                      />
                    </td>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>
                      <input
                        type="date"
                        value={supplier.from}
                        onChange={(e) => handleSupplierChange(index, 'from', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={supplier.to}
                        onChange={(e) => handleSupplierChange(index, 'to', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={supplier.status}
                        onChange={(e) => handleSupplierChange(index, 'status', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAgencyModal;
