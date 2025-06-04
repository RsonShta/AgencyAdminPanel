import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SupplierControls from '../components/SuppliersControls';
import SupplierTable from '../components/SupplierTable';
import AddSupplierModal from '../components/AddSupplierModal';
import BulkActions from '../components/BulkActions';
import { useAgencyContext } from '../context/AgencyContext';
import { useSupplierContext } from '../context/SupplierContext';
import '../styles/suppliers.css';

const SuppliersPage: React.FC = () => {
  const { suppliers, setSuppliers } = useSupplierContext();
  const { agencies } = useAgencyContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnableSelected = () => {
    setSuppliers(prev =>
      prev.map(s => selectedSuppliers.includes(s.id) ? { ...s, status: 'Active' } : s)
    );
    setSelectedSuppliers([]);
  };

  const handleDisableSelected = () => {
    setSuppliers(prev =>
      prev.map(s => selectedSuppliers.includes(s.id) ? { ...s, status: 'Inactive' } : s)
    );
    setSelectedSuppliers([]);
  };

  const handleDeleteUser = (id: number) => {
    const supplier = suppliers.find(s => s.id === id);
    if (!supplier) return;

    const confirmed = window.confirm(`Are you sure you want to delete supplier "${supplier.name}"?`);
    if (confirmed) {
      setSuppliers(prev => prev.filter(s => s.id !== id));
      setSelectedSuppliers(prev => prev.filter(selId => selId !== id));
    }
  };

  const handleAddSupplier = (newSupplierData: {
    name: string;
    type: string;
    address: string;
    contact: string;
    email: string;
    updatedBy: string;
    agencyIds: string[];
  }) => {
    const newSupplier = {
      id: suppliers.length + 1,
      name: newSupplierData.name,
      email: newSupplierData.email,
      status: 'Active',
      agencyIds: newSupplierData.agencyIds,
    };
    console.log('Added supplier with agencyIds:', newSupplierData.agencyIds);
    setSuppliers(prev => [...prev, { ...newSupplier, status: "Active" }]);
    setShowAddModal(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />

        <SupplierControls
          onSearchChange={setSearchQuery}
          onAddClick={() => setShowAddModal(true)}
        />

        <BulkActions
          isAnySelected={selectedSuppliers.length > 0}
          onEnableSelected={handleEnableSelected}
          onDisableSelected={handleDisableSelected}
        />

        <SupplierTable
          suppliers={filteredSuppliers}
          selectedSuppliers={selectedSuppliers}
          onSelectionChange={setSelectedSuppliers}
          onDeleteUser={handleDeleteUser}
        />

        <AddSupplierModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSupplier}
          agencies={agencies.map(agency => ({ ...agency, id: agency.id.toString() }))}
        />
      </div>
    </div>
  );
};

export default SuppliersPage;
