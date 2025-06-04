import React, { useState, useEffect, useRef } from "react";

type Agency = {
  id: number;
  name: string;
  code: string;
  status: "active" | "inactive";
};

type AgencyTableProps = {
  agencies: Agency[];
  selectedAgencies: number[];
  onSelectionChange: (selected: number[]) => void;
  onDelete: (id: number) => void;
  pageSize?: number;
};

const AgencyTable: React.FC<AgencyTableProps> = ({
  agencies,
  selectedAgencies,
  onSelectionChange,
  onDelete,
  pageSize = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({
    id: 50,
    name: 200,
    code: 200,
    status: 100,
    actions: 100,
  });

  const startX = useRef(0);
  const startWidth = useRef(0);
  const resizingCol = useRef<string | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [agencies]);

  const totalPages = Math.ceil(agencies.length / pageSize);
  const pagedAgencies = agencies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onMouseMove = (e: MouseEvent) => {
    if (!resizingCol.current) return;
    const deltaX = e.clientX - startX.current;
    setColumnWidths((prev) => {
      const newWidth = Math.max(startWidth.current + deltaX, 50);
      return { ...prev, [resizingCol.current as string]: newWidth };
    });
  };

  const onMouseUp = () => {
    resizingCol.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e: React.MouseEvent, col: string) => {
    startX.current = e.clientX;
    startWidth.current = columnWidths[col];
    resizingCol.current = col;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const toggleCheckbox = (id: number) => {
    const isSelected = selectedAgencies.includes(id);
    const newSelection = isSelected
      ? selectedAgencies.filter((i) => i !== id)
      : [...selectedAgencies, id];
    onSelectionChange(newSelection);
  };

  const toggleSelectAll = () => {
    const allSelected = pagedAgencies.every((a) =>
      selectedAgencies.includes(a.id)
    );
    const newSelection = allSelected
      ? selectedAgencies.filter((id) => !pagedAgencies.some((a) => a.id === id))
      : Array.from(new Set([...selectedAgencies, ...pagedAgencies.map((a) => a.id)]));
    onSelectionChange(newSelection);
  };

  return (
    <section className="user-list" style={{ overflowX: "auto" }}>
      <table
        className="supplier-table"
        role="table"
        aria-label="Agency Table"
        style={{ minWidth: 700 }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <input
                type="checkbox"
                checked={pagedAgencies.every((a) => selectedAgencies.includes(a.id))}
                onChange={toggleSelectAll}
              />
            </th>
            {["id", "name", "code", "status", "actions"].map((col) => (
              <th
                key={col}
                style={{ width: columnWidths[col], position: "relative" }}
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
                <div
                  onMouseDown={(e) => onMouseDown(e, col)}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    height: "100%",
                    width: 5,
                    cursor: "col-resize",
                    userSelect: "none",
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pagedAgencies.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-suppliers">
                No agencies found.
              </td>
            </tr>
          ) : (
            pagedAgencies.map((agency) => (
              <tr key={agency.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAgencies.includes(agency.id)}
                    onChange={() => toggleCheckbox(agency.id)}
                  />
                </td>
                <td>{agency.id}</td>
                <td>{agency.name}</td>
                <td>{agency.code}</td>
                <td>
                  <span className={`status ${agency.status}`}>
                    {agency.status.charAt(0).toUpperCase() + agency.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button className="icon-button edit" aria-label="Edit agency">
                    <i className="fas fa-edit" />
                  </button>
                  <button
                    className="icon-button delete"
                    aria-label="Delete agency"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete agency "${agency.name}"?`
                        )
                      ) {
                        onDelete(agency.id);
                      }
                    }}
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
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default AgencyTable;
