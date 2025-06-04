import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AgencyControls from "../components/AgencyControls";
import AgencyTable from "../components/AgencyTable";
import AddAgencyModal from "../components/AddAgencyModal";
import BulkActions from "../components/BulkActions";
import { useAgencyContext } from "../context/AgencyContext";
import "../styles/suppliers.css";

const AgencyPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const {
    agencies,
    selectedAgencyIds,
    setSelectedAgencyIds,
    bulkUpdateStatus,
    addAgency,
    deleteAgency,
  } = useAgencyContext();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddAgency = (data: {
    name: string;
    code: string;
    status: "active" | "inactive";
  }) => {
    addAgency({
      name: data.name,
      code: data.code,
      status: data.status,
    });
  };

  const handleViewSuppliers = () => {
    alert("Suppliers button clicked — implement supplier popup here.");
  };

  const filteredAgencies = agencies.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content p-4">
        <Header />

        <AgencyControls
          onSearchChange={handleSearchChange}
          onAddClick={() => setShowAddModal(true)}
        />

        <BulkActions
          isAnySelected={selectedAgencyIds.length > 0}
          onEnableSelected={() => bulkUpdateStatus("active")}
          onDisableSelected={() => bulkUpdateStatus("inactive")}
        />
        <AgencyTable
          agencies={filteredAgencies}
          selectedAgencies={selectedAgencyIds}
          onSelectionChange={setSelectedAgencyIds}
          onDelete={deleteAgency}
        />

        {showAddModal && (
          <AddAgencyModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddAgency}
            nextId={Math.max(0, ...agencies.map((a) => a.id)) + 1}
            onViewSuppliers={handleViewSuppliers}
          />
        )}
      </div>
    </div>
  );
};

export default AgencyPage;
