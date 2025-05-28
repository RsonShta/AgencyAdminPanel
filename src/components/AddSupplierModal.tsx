import React, { useState, useRef, useEffect } from "react";
import '../styles/suppliers.css';

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
    agency: string;
  }) => void;
};

const AddSupplierModal: React.FC<AddSupplierModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    contact: '',
    email: '',
    updatedBy: '',
    agency: '', // <-- NEW FIELD
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0 });
  const sizeStart = useRef({ width: 0, height: 0 });

  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [size, setSize] = useState({ width: 600, height: 450 });

  useEffect(() => {
    if (isOpen) {
      setPosition({ top: window.innerHeight * 0.2, left: window.innerWidth * 0.3 });
      setSize({ width: 600, height: 450 });
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
          width: Math.max(400, newWidth),
          height: Math.max(200, newHeight),
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      agency: '',
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      type: '',
      address: '',
      contact: '',
      email: '',
      updatedBy: '',
      agency: '',
    });
    onClose();
  };

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
          <button
            onClick={handleCancel}
            className="add-supplier-modal-close-btn"
            aria-label="Close modal"
            type="button"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-supplier-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Supplier Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                id="type"
                name="type"
                type="text"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                id="contact"
                name="contact"
                type="text"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="agency">Agency</label>
            <select
              id="agency"
              name="agency"
              value={formData.agency}
              onChange={handleChange}
              required
            >
              <option value="">Select an agency</option>
              <option value="Agency A">Agency A</option>
              <option value="Agency B">Agency B</option>
              <option value="Agency C">Agency C</option>
              {/* You can dynamically render options from props if needed */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="updatedBy">Updated By</label>
            <input
              id="updatedBy"
              name="updatedBy"
              type="text"
              value={formData.updatedBy}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-supplier-modal-actions">
            <button type="button" onClick={handleCancel} className="add-supplier-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="add-supplier-submit-btn">
              Add Supplier
            </button>
          </div>
        </form>

        <div
          onMouseDown={startResize}
          className="add-supplier-resize-handle"
          aria-label="Resize modal"
        />
      </div>
    </div>
  );
};

export default AddSupplierModal;
