import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SupplierControls from '../components/SuppliersControls';
import SupplierTable from '../components/SupplierTable';
import AddSupplierModal from '../components/AddSupplierModal';
import BulkActions from '../components/BulkActions';
import { useAgencyContext } from '../context/AgencyContext';
import { useSupplierContext, type Supplier } from '../context/SupplierContext';
import { fetchSuppliers } from '../api/apiData';
import '../styles/suppliers.css';

const SuppliersPage: React.FC = () => {
  const { suppliers, setSuppliers } = useSupplierContext();
  const { agencies } = useAgencyContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSuppliers(token);
        if (Array.isArray(data)) {
          const mappedSuppliers = data.map((supplier: any) => ({
            id: supplier.supplier_id,
            name: supplier.supplier_name,
            type: supplier.supplier_type,
            api_endpoint: supplier.api_endpoint,
            api_key: supplier.api_key,
            is_active: supplier.is_active,
            address: supplier.supplier_address,
            contact_name: supplier.supplier_contact_name,
            contact_number: supplier.supplier_contact_number,
            email: supplier.supplier_email,
            agencyIds: [], // assuming not in API or handle later
          }));
          console.log('Mapped suppliers:', mappedSuppliers); // Debug log
          setSuppliers(mappedSuppliers);
        } else {
          console.error('API response is not an array:', data);
          setError('Invalid data format received from server');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch suppliers');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setSuppliers]);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.email?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.contact_name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEnableSelected = () => {
    setSuppliers(prev =>
      prev.map(s => selectedSuppliers.includes(s.id) ? { ...s, is_active: true } : s)
    );
    setSelectedSuppliers([]);
  };

  const handleDisableSelected = () => {
    setSuppliers(prev =>
      prev.map(s => selectedSuppliers.includes(s.id) ? { ...s, is_active: false } : s)
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
    api_endpoint: string;
    api_key?: string;
    address?: string;
    contact_name?: string;
    contact_number?: string;
    email?: string;
  }) => {
    const newSupplier: Supplier = {
      id: suppliers.length + 1,
      name: newSupplierData.name,
      type: newSupplierData.type,
      api_endpoint: newSupplierData.api_endpoint,
      api_key: newSupplierData.api_key,
      is_active: true,
      address: newSupplierData.address,
      contact_name: newSupplierData.contact_name,
      contact_number: newSupplierData.contact_number,
      email: newSupplierData.email,
      agencyIds: [],
    };
    console.log('Added new supplier:', newSupplier.name);
    setSuppliers(prev => [...prev, newSupplier]);
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

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

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
