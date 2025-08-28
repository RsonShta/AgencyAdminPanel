import React, { useState, useEffect, useRef } from 'react';
import '../styles/suppliers.css';

type Agency = {
  id: string;
  name: string;
  code: string;
};

type SelectedAgencyDetails = {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
};

type AddSupplierModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (supplier: {
    name: string;
    type: string;
    address: string;
    contact: string;
    email: string;
    updatedBy: string;
    agencyIds: string[];
  }) => void;
  agencies: Agency[];
};

const AddSupplierModal: React.FC<AddSupplierModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  agencies,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    contact: '',
    email: '',
    updatedBy: '',
    agencyIds: [] as string[],
  });

  const [agencyDetails, setAgencyDetails] = useState<SelectedAgencyDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  const agenciesPerPage = 5;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0 });
  const sizeStart = useRef({ width: 0, height: 0 });

  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [size, setSize] = useState({ width: 850, height: 500 });

  useEffect(() => {
    if (isOpen) {
      setPosition({ top: window.innerHeight * 0.15, left: window.innerWidth * 0.25 });
      setSize({ width: 850, height: 500 });
      setSearchTerm('');
      setCurrentPage(1);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current && modalRef.current) {
        const newLeft = e.clientX - offset.current.x;
        const newTop = e.clientY - offset.current.y;
        setPosition({ top: newTop, left: newLeft });
      } else if (isResizing.current) {
        const newWidth = sizeStart.current.width + (e.clientX - resizeStart.current.x);
        const newHeight = sizeStart.current.height + (e.clientY - resizeStart.current.y);
        setSize({
          width: Math.max(600, newWidth),
          height: Math.max(300, newHeight),
        });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      isResizing.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const filtered = agencies.filter(agency =>
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAgencies(filtered);
    setCurrentPage(1);
  }, [searchTerm, agencies]);

  const startDrag = (e: React.MouseEvent) => {
    if (!modalRef.current) return;
    isDragging.current = true;
    const rect = modalRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    isResizing.current = true;
    resizeStart.current = { x: e.clientX, y: e.clientY };
    sizeStart.current = { width: size.width, height: size.height };
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: '',
      type: '',
      address: '',
      contact: '',
      email: '',
      updatedBy: '',
      agencyIds: [],
    });
    setAgencyDetails([]);
    onClose();
  };

  const handleAgencyToggle = (agency: Agency, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        agencyIds: [...prev.agencyIds, agency.id],
      }));
      setAgencyDetails(prev => [
        ...prev,
        { id: agency.id, startDate: '', endDate: '', status: 'active' },
      ]);
    } else {
      setFormData(prev => ({
        ...prev,
        agencyIds: prev.agencyIds.filter(id => id !== agency.id),
      }));
      setAgencyDetails(prev => prev.filter(detail => detail.id !== agency.id));
    }
  };

  const handleDetailChange = (
    agencyId: string,
    field: keyof Omit<SelectedAgencyDetails, 'id'>,
    value: string
  ) => {
    setAgencyDetails(prev =>
      prev.map(detail =>
        detail.id === agencyId ? { ...detail, [field]: value } : detail
      )
    );
  };

  const indexOfLastAgency = currentPage * agenciesPerPage;
  const indexOfFirstAgency = indexOfLastAgency - agenciesPerPage;
  const currentAgencies = filteredAgencies.slice(indexOfFirstAgency, indexOfLastAgency);
  const totalPages = Math.ceil(filteredAgencies.length / agenciesPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSelectAllToggle = (checked: boolean) => {
    const idsToSelect = currentAgencies.map(a => a.id);
    if (checked) {
      const newIds = idsToSelect.filter(id => !formData.agencyIds.includes(id));
      setFormData(prev => ({
        ...prev,
        agencyIds: [...prev.agencyIds, ...newIds],
      }));
      setAgencyDetails(prev => {
        const newDetails = idsToSelect
          .filter(id => !prev.find(d => d.id === id))
          .map(id => ({ id, startDate: '', endDate: '', status: 'active' }));
        return [...prev, ...newDetails];
      });
    } else {
      setFormData(prev => ({
        ...prev,
        agencyIds: prev.agencyIds.filter(id => !idsToSelect.includes(id)),
      }));
      setAgencyDetails(prev => prev.filter(d => !idsToSelect.includes(d.id)));
    }
  };

  const allCurrentSelected = currentAgencies.every(a => formData.agencyIds.includes(a.id));
  const someCurrentSelected = currentAgencies.some(a => formData.agencyIds.includes(a.id));

  if (!isOpen) return null;

  return (
    <div className="add-supplier-modal-overlay" onClick={handleBackdropClick}>
      <div
        ref={modalRef}
        className="add-supplier-modal"
        style={{ top: position.top, left: position.left, width: size.width, height: size.height }}
      >
        <div className="add-supplier-modal-header" onMouseDown={startDrag}>
          <span>Add New Supplier</span>
          <button onClick={handleSubmit} className="add-supplier-modal-close-btn" type="button">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-supplier-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Supplier Name</label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input id="type" name="type" type="text" value={formData.type} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input id="contact" name="contact" type="text" value={formData.contact} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="updatedBy">Updated By</label>
              <input id="updatedBy" name="updatedBy" type="text" value={formData.updatedBy} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Agencies</label>
            <button
              type="button"
              className="add-agency-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Select Agencies{' '}
              <i className={`fas ${showDropdown ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
            </button>

            {showDropdown && (
              <div className="dropdown-container">
                <input
                  type="text"
                  placeholder="Search agencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="dropdown-search"
                />
                <table className="dropdown-agency-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={allCurrentSelected}
                          ref={input => {
                            if (input) input.indeterminate = !allCurrentSelected && someCurrentSelected;
                          }}
                          onChange={(e) => handleSelectAllToggle(e.target.checked)}
                        />
                      </th>
                      <th>Agency Code</th>
                      <th>Agency Name</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAgencies.map((agency) => {
                      const selected = formData.agencyIds.includes(agency.id);
                      const details = agencyDetails.find(d => d.id === agency.id) || {
                        startDate: '',
                        endDate: '',
                        status: 'active',
                      };
                      return (
                        <tr key={agency.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={(e) => handleAgencyToggle(agency, e.target.checked)}
                            />
                          </td>
                          <td>{agency.code}</td>
                          <td>{agency.name}</td>
                          <td>
                            <input
                              type="date"
                              disabled={!selected}
                              value={details.startDate}
                              onChange={(e) =>
                                handleDetailChange(agency.id, 'startDate', e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              disabled={!selected}
                              value={details.endDate}
                              onChange={(e) =>
                                handleDetailChange(agency.id, 'endDate', e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <select
                              disabled={!selected}
                              value={details.status}
                              onChange={(e) =>
                                handleDetailChange(agency.id, 'status', e.target.value)
                              }
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={currentPage === i + 1 ? 'active' : ''}
                      type="button"
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="add-supplier-modal-actions">
            <button type="button" onClick={onClose} className="add-supplier-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="add-supplier-submit-btn">
              Add Supplier
            </button>
          </div>
        </form>

        <div onMouseDown={startResize} className="add-supplier-resize-handle" />
      </div>
    </div>
  );
};

export default AddSupplierModal;
