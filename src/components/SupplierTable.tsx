import React, { useState, useEffect } from 'react';

type Supplier = {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
};

type SupplierTableProps = {
  suppliers: Supplier[];
  selectedSuppliers: number[];
  onSelectionChange: (selected: number[]) => void;
  onDeleteUser?: (id: number) => void;
  pageSize?: number;
};

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  selectedSuppliers,
  onSelectionChange,
  onDeleteUser,
  pageSize = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reset page when supplier list changes
  }, [suppliers]);

  const totalPages = Math.ceil(suppliers.length / pageSize);
  const pagedSuppliers = suppliers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const allCurrentSelected = pagedSuppliers.every((s) =>
    selectedSuppliers.includes(s.id)
  );

  const toggleCheckbox = (id: number) => {
    const isAlreadySelected = selectedSuppliers.includes(id);
    const newSelected = isAlreadySelected
      ? selectedSuppliers.filter((i) => i !== id)
      : [...selectedSuppliers, id];
    onSelectionChange(newSelected);
  };

  const toggleSelectAll = () => {
    if (allCurrentSelected) {
      const newSelection = selectedSuppliers.filter(
        (id) => !pagedSuppliers.some((s) => s.id === id)
      );
      onSelectionChange(newSelection);
    } else {
      const newSelection = Array.from(
        new Set([...selectedSuppliers, ...pagedSuppliers.map((s) => s.id)])
      );
      onSelectionChange(newSelection);
    }
  };

  const isSelected = (id: number) => selectedSuppliers.includes(id);

  const handleDeleteClick = (id: number, name: string) => {
    onDeleteUser && onDeleteUser(id); // Just notify the parent
  };
  

  return (
    <section className="user-list">
      <table className="supplier-table" role="table" aria-label="Supplier Table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allCurrentSelected}
                onChange={toggleSelectAll}
                aria-label="Select all on this page"
              />
            </th>
            <th className="header-green">ID</th>
            <th className="header-green">Name</th>
            <th className="header-green">Email</th>
            <th className="header-green">Status</th>
            <th className="header-green">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pagedSuppliers.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-suppliers">
                No suppliers found.
              </td>
            </tr>
          ) : (
            pagedSuppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected(supplier.id)}
                    onChange={() => toggleCheckbox(supplier.id)}
                    aria-label={`Select supplier ${supplier.name}`}
                  />
                </td>
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>
                  <span
                    className={`status ${supplier.status.toLowerCase()}`}
                    aria-label={supplier.status}
                  >
                    {supplier.status}
                  </span>
                </td>
                <td>
                  <button
                    className="icon-button edit"
                    aria-label={`Edit supplier ${supplier.name}`}
                  >
                    <i className="fas fa-edit" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(supplier.id, supplier.name)}
                    className="icon-button delete"
                    aria-label={`Delete supplier ${supplier.name}`}
                  >
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
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? 'active' : ''}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default SupplierTable;
